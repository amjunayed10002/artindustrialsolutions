from django.contrib import admin

from .models import PublicSubmission, SiteSnapshot


@admin.register(SiteSnapshot)
class SiteSnapshotAdmin(admin.ModelAdmin):
    list_display = ("id", "updated_at")
    readonly_fields = ("updated_at",)


@admin.register(PublicSubmission)
class PublicSubmissionAdmin(admin.ModelAdmin):
    list_display = ("id", "kind", "created_at")
    readonly_fields = ("kind", "data", "created_at")