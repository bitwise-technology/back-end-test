from .views import UserCreateView
from django.urls import path

urlpatterns = [
    path("user_create/", UserCreateView.as_view(), name="user_create_view")
]
