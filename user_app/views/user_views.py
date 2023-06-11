import requests
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

from user_app.models import User
from user_app.serializers import UserSerializer

# Create your views here.


class UserCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)

            response_data = {
                "message": "User saved successfully",
                "user": serializer.data,
            }

            return Response(response_data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            response_data = {
                "response_status": f"HTTP {status.HTTP_400_BAD_REQUEST} bad request",
                "response_message": serializer.errors,
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)


class UserUpdateView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "id"

    def update(self, request, *args, **kwargs):
        try:
            partial = kwargs.pop("partial", False)
            instance = self.get_object()
            serializer = self.get_serializer(
                instance, data=request.data, partial=partial
            )
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)

            response_data = {
                "message": "User updated successfully",
                "user": serializer.data,
            }

            return Response(response_data, status=status.HTTP_200_OK)
        except ValidationError as e:
            response_data = {
                "response_status": f"HTTP {status.HTTP_400_BAD_REQUEST} bad request",
                "response_message": serializer.errors,
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)


class UserDetailByUsernameView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "username"

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        github_api = f"https://api.github.com/users/{instance.username}"
        response = requests.get(github_api)

        if response.status_code == 200:
            github_user_data = response.json()
            extra_data = {
                "public_repos": github_user_data.get("public_repos"),
                "followers": github_user_data.get("followers"),
                "following": github_user_data.get("following"),
                "github_profile_url": github_user_data.get("html_url"),
            }

            serializer_data = serializer.data
            serializer_data.update(extra_data)
            return Response(serializer_data)
        return Response(serializer.data)

    def get_object(self):
        queryset = self.get_queryset()
        username = self.kwargs["username"]
        return get_object_or_404(queryset, username__iexact=username)


class UserDetailByEmailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "email"

    def get_object(self):
        queryset = self.get_queryset()
        email = self.kwargs["email"]
        return get_object_or_404(queryset, email__iexact=email)


class UserSearchView(generics.ListAPIView):
    serializer_class = UserSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        username = self.kwargs["username"]
        return User.objects.filter(username__icontains=username)
