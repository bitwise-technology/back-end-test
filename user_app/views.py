from django.shortcuts import render
from rest_framework import generics, status
from .serializers import UserSerializer
from rest_framework.response import Response

# Create your views here.

class UserCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        response_data = {
            'message': 'User saved successfully',
            'user': serializer.data
        }

        return Response(response_data, status=status.HTTP_201_CREATED)