from .views import UserCreateView, UserUpdateView, UserDetailByEmailView, UserDetailByUsernameView
from django.urls import path

urlpatterns = [
    path("user/create/", UserCreateView.as_view(), name="user_create_view"),
    path("user/update/<int:id>/", UserUpdateView.as_view(), name="user_update_view"),
    path("user/detail/username/<str:username>/", UserDetailByUsernameView.as_view(), name="user_detail_username_view"),
    path("user/detail/email/<str:email>/", UserDetailByEmailView.as_view(), name="user_detail_email_view"),
]
