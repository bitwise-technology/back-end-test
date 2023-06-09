from user_app.views.user_views import *
from user_app.views.user_github_views import *
from django.urls import path

app_name = "user"

urlpatterns = [
    path("v1/user/create/", UserCreateView.as_view(), name="user_create_view"),
    path("v1/user/update/<int:id>/", UserUpdateView.as_view(), name="user_update_view"),
    path("v1/user/detail/username/<str:username>/", UserDetailByUsernameView.as_view(), name="user_detail_username_view"),
    path("v1/user/detail/email/<str:email>/", UserDetailByEmailView.as_view(), name="user_detail_email_view"),

    path("v1/github_user/create/", UserCreateViewFromGithub.as_view(), name="user_github_create_view"),
    path("v1/github_user/login/<str:login>/", UserGithubDetailByUsernameView.as_view(), name="user_github_detail_username_view"),
    path("v1/github_user/update/<int:id>/", UserGithubUpdateView.as_view(), name="user_github_update_view"),

]
