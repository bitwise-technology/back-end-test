from user_app.models import User
from rest_framework import generics, status
from user_app.serializers import UserSerializer
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

class UserUpdateView(generics.RetrieveUpdateAPIView ):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        response_data = {
            'message': 'User updated successfully',
            'user': serializer.data
        }

        return Response(response_data, status=status.HTTP_200_OK)

class UserDetailByUsernameView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'

class UserDetailByEmailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'email'


