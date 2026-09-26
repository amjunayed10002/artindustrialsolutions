from django.contrib import admin
from django.urls import path

from content import views

urlpatterns = [
	path("admin/", admin.site.urls),
	path("api/csrf/", views.csrf_token),
	path("api/login/", views.login_view),
	path("api/logout/", views.logout_view),
	path("api/session/", views.session_view),
	path("api/site-data/", views.site_data_view),
	path("api/submissions/<str:kind>/", views.submission_view),
]