import json
from copy import deepcopy

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from django.db import transaction
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.utils import timezone
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_GET, require_POST, require_http_methods

from .models import PublicSubmission, SiteSnapshot


def _json_body(request):
    try:
        value = json.loads(request.body or b"{}")
    except (json.JSONDecodeError, UnicodeDecodeError):
        return None
    return value if isinstance(value, dict) else None


def _admin_payload(user):
    return {
        "id": user.pk,
        "username": user.get_username(),
        "name": user.get_full_name() or user.get_username(),
        "email": user.email,
        "role": "Super Admin" if user.is_superuser else "Content Manager",
        "last_login": user.last_login.strftime("%Y-%m-%d %H:%M") if user.last_login else "Never",
        "permissions": [
            "settings", "banners", "about", "categories", "products", "services",
            "industries", "company-docs", "vendor-docs", "rfqs", "messages", "users", "backup",
        ] if user.is_superuser else ["banners", "about", "company-docs", "vendor-docs", "categories", "products", "services", "industries"],
    }


def _sanitize_site_data(data):
    clean_data = deepcopy(data)
    users = clean_data.get("adminUsers")
    if isinstance(users, list):
        clean_data["adminUsers"] = [
            {key: value for key, value in user.items() if key != "password"}
            for user in users
            if isinstance(user, dict)
        ]
    return clean_data


def _merge_submissions(snapshot):
    data = _sanitize_site_data(snapshot.data)
    imported = set(data.get("_imported_submission_ids", []))
    pending = PublicSubmission.objects.exclude(id__in=imported).order_by("id")
    for submission in pending:
        if submission.kind == "rfq":
            records = data.setdefault("rfqs", [])
            duplicate = any(
                item.get("email") == submission.data.get("email")
                and item.get("customer_name") == submission.data.get("customer_name")
                and item.get("product_name") == submission.data.get("product_name")
                and item.get("created_at") == submission.data.get("created_at")
                for item in records
            )
            if not duplicate:
                new_id = max((item.get("id", 0) for item in records), default=0) + 1
                submission_data = {**submission.data, "id": new_id}
                submission_data["reference_no"] = f"RFQ-{timezone.localdate().year}-{100 + new_id:04d}"
                records.append(submission_data)
        else:
            records = data.setdefault("contactMessages", [])
            duplicate = any(
                item.get("email") == submission.data.get("email")
                and item.get("subject") == submission.data.get("subject")
                and item.get("message") == submission.data.get("message")
                and item.get("created_at") == submission.data.get("created_at")
                for item in records
            )
            if not duplicate:
                new_id = max((item.get("id", 0) for item in records), default=0) + 1
                records.append({**submission.data, "id": new_id})
        imported.add(submission.pk)
    data["_imported_submission_ids"] = sorted(imported)
    if len(imported) != len(snapshot.data.get("_imported_submission_ids", [])):
        snapshot.data = data
        snapshot.save(update_fields=("data", "updated_at"))
    return data


@require_GET
@ensure_csrf_cookie
def csrf_token(request):
    return JsonResponse({"csrfToken": get_token(request)})


@require_POST
def login_view(request):
    payload = _json_body(request)
    if payload is None:
        return JsonResponse({"error": "Expected a JSON object."}, status=400)
    username = str(payload.get("username", "")).strip()
    if "@" in username:
        matched_user = get_user_model().objects.filter(email__iexact=username).first()
        if matched_user:
            username = matched_user.get_username()
    user = authenticate(
        request,
        username=username,
        password=str(payload.get("password", "")),
    )
    if user is None or not user.is_active or not user.is_staff:
        return JsonResponse({"error": "Invalid administrator credentials."}, status=401)
    login(request, user)
    return JsonResponse({"user": _admin_payload(user)})


@require_GET
def session_view(request):
    if not request.user.is_authenticated or not request.user.is_staff:
        return JsonResponse({"user": None})
    return JsonResponse({"user": _admin_payload(request.user)})


@require_POST
def logout_view(request):
    logout(request)
    return JsonResponse({"ok": True})


@require_http_methods(["GET", "PUT", "POST"])
def site_data_view(request):
    snapshot = SiteSnapshot.objects.first()
    if request.method == "GET":
        if snapshot is None:
            return JsonResponse({"initialized": False, "data": None})
        data = _merge_submissions(snapshot) if request.user.is_authenticated and request.user.is_staff else deepcopy(snapshot.data)
        data.pop("_imported_submission_ids", None)
        if not request.user.is_authenticated or not request.user.is_staff:
            data.pop("adminUsers", None)
        return JsonResponse({"initialized": True, "data": data})

    if not request.user.is_authenticated or not request.user.is_staff:
        return JsonResponse({"error": "Administrator login required."}, status=403)
    payload = _json_body(request)
    if payload is None or not isinstance(payload.get("data"), dict):
        return JsonResponse({"error": "Expected site data as a JSON object."}, status=400)

    with transaction.atomic():
        snapshot = SiteSnapshot.objects.select_for_update().first()
        if request.method == "POST" and snapshot is not None:
            return JsonResponse({"error": "Site data has already been initialized."}, status=409)
        if snapshot is None:
            snapshot = SiteSnapshot.objects.create(data=_sanitize_site_data(payload["data"]))
        else:
            current = deepcopy(snapshot.data)
            clean_data = _sanitize_site_data(payload["data"])
            clean_data["_imported_submission_ids"] = current.get("_imported_submission_ids", [])
            snapshot.data = clean_data
            snapshot.save(update_fields=("data", "updated_at"))
        data = _merge_submissions(snapshot)
    return JsonResponse({"initialized": True, "data": data})


@require_POST
def submission_view(request, kind):
    if kind not in {"rfq", "contact"}:
        return JsonResponse({"error": "Unknown submission type."}, status=404)
    payload = _json_body(request)
    if payload is None:
        return JsonResponse({"error": "Expected a JSON object."}, status=400)

    created_at = timezone.localtime().strftime("%Y-%m-%d %H:%M")
    if kind == "rfq":
        snapshot = SiteSnapshot.objects.first()
        existing_count = len(snapshot.data.get("rfqs", [])) if snapshot else 0
        new_id = max(existing_count, PublicSubmission.objects.filter(kind="rfq").count()) + 1
        payload.update({
            "id": new_id,
            "reference_no": f"RFQ-{timezone.localdate().year}-{100 + new_id:04d}",
            "status": "New",
            "created_at": created_at,
        })
    else:
        payload.update({"id": PublicSubmission.objects.filter(kind="contact").count() + 1, "is_read": False, "created_at": created_at})

    PublicSubmission.objects.create(kind=kind, data=payload)
    return JsonResponse({"data": payload}, status=201)