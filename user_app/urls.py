from user_app.views.user_views import *
from user_app.views.user_github_views import *
from django.urls import path

urlpatterns = [
    path("user/create/", UserCreateView.as_view(), name="user_create_view"),
    path("user/update/<int:id>/", UserUpdateView.as_view(), name="user_update_view"),
    path("user/detail/username/<str:username>/", UserDetailByUsernameView.as_view(), name="user_detail_username_view"),
    path("user/detail/email/<str:email>/", UserDetailByEmailView.as_view(), name="user_detail_email_view"),

    path("user/github/create/", UserCreateViewFromGithub.as_view(), name="user_github_create_view"),
    path("user/github/login/<str:login>/", UserGithubDetailByUsernameView.as_view(), name="user_detail_username_view"),
    path("user/github/update/<int:id>/", UserGithubUpdateView.as_view(), name="user_update_view"),

]
