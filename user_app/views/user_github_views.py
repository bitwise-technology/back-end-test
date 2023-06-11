from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

from user_app.models import UserGithub
from user_app.serializers import (
    UserCreateFromGithubSerializer,
    UserGithubViewSerializer,
)
from user_app.services.github_service import GitHubService
from user_app.views.utils_views import get_suggested_usernames


class UserCreateViewFromGithub(generics.CreateAPIView):
    serializer_class = UserCreateFromGithubSerializer

    def create(self, request, *args, **kwargs):
        github_username = request.data.get("login")
        github_service = GitHubService()

        if not github_username:
            return Response(
                {
                    "response_status": f"{status.HTTP_400_BAD_REQUEST} Bad request",
                    "response_messege": f"Missing required field: login",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            github_data = github_service.get_github_data(github_username)
            if github_data is None:
                suggests = get_suggested_usernames()
                return Response(suggests, status=status.HTTP_404_NOT_FOUND)

            try:
                user = github_service.create_user_from_github_api(github_data)
                response_data = github_service.response_data_user(user)

                return Response(response_data, status=status.HTTP_201_CREATED)

            except IntegrityError:
                return Response(
                    {"error": "User with this login already exists."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class UserGithubDetailByUsernameView(generics.RetrieveAPIView):
    queryset = UserGithub.objects.all()
    serializer_class = UserGithubViewSerializer
    lookup_field = "login"

    def get_object(self):
        queryset = self.get_queryset()
        login = self.kwargs["login"]
        return get_object_or_404(queryset, login__iexact=login)


class UserGithubUpdateView(generics.RetrieveUpdateAPIView):
    queryset = UserGithub.objects.all()
    serializer_class = UserGithubViewSerializer
    lookup_field = "id"

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        response_data = {
            "message": "User updated successfully",
            "user": serializer.data,
        }

        return Response(response_data, status=status.HTTP_200_OK)


class UserGithubSearchView(generics.ListAPIView):
    serializer_class = UserGithubViewSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        login = self.kwargs["login"]
        return UserGithub.objects.filter(login__icontains=login)
