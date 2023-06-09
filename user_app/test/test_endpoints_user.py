from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from user_app.models import User 
from user_app.serializers import UserSerializer
from unittest import mock

class UserCreateViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            username="username_teste",
            name="teste",
            last_name="test",
            profile_image_url="",
            bio="",
            email="teste@example.com",
            gender="Male"
        )

    def test_success_create_user(self):
        url = reverse("user:user_create_view")

        data = {
            "username": "user_teste",
            "name": "Teste",
            "last_name": "One",
            "profile_image_url": "",
            "bio": "",
            "email": "testeone@example.com",
            "gender": ""
        }

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'User saved successfully')

        user = User.objects.get(username='user_teste')
        serializer = UserSerializer(user)
        self.assertEqual(response.data['user'], serializer.data)

    def test_failed_create_user(self):
        url = reverse("user:user_create_view")

        data = {
            "username": "",
            "name": "Teste",
            "last_name": "One",
            "profile_image_url": "",
            "bio": "",
            "email": "testeone@example.com",
            "gender": ""
        }

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_success_update_user(self):
        url = reverse('user:user_update_view', kwargs={'id': self.user.id})

        data = {
            "username": "newusername",
            "name": "Teste",
            "last_name": "One",
            "profile_image_url": "",
            "bio": "",
            "email": "testeone@example.com",
            "gender": "Male"
        }

        response = self.client.put(url, data, format='json')
        

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'User updated successfully')
        self.assertEqual(response.data['user']['username'], 'newusername')

    def test_failed_update_user(self):
        url = reverse('user:user_update_view', kwargs={'id': self.user.id})

        data = {
            "username": "",
            "name": "Teste",
            "last_name": "One",
            "profile_image_url": "",
            "bio": "",
            "email": "testeone@example.com",
            "gender": "Male"
        }

        response = self.client.put(url, data, format='json')
        

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_user_by_email(self):

        url = reverse("user:user_detail_email_view", kwargs={"email":self.user.email})
        
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.user.id)
        self.assertEqual(response.data['username'], self.user.username)
        self.assertEqual(response.data['name'], self.user.name)
        self.assertEqual(response.data['last_name'], self.user.last_name)
        self.assertEqual(response.data['email'], self.user.email)
        self.assertEqual(response.data['gender'], self.user.gender)

    def test_get_user_by_username(self):

        url = reverse("user:user_detail_username_view", kwargs={"username":self.user.username})
        
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.user.id)
        self.assertEqual(response.data['username'], self.user.username)
        self.assertEqual(response.data['name'], self.user.name)
        self.assertEqual(response.data['last_name'], self.user.last_name)
        self.assertEqual(response.data['email'], self.user.email)
        self.assertEqual(response.data['gender'], self.user.gender)

    def test_get_user_by_username_if_in_github(self):

        url = reverse("user:user_detail_username_view", kwargs={"username":self.user.username})

        github_response_data = {
            'public_repos': 10,
            'followers': 100,
            'following': 50,
            'html_url': 'https://github.com/username_teste'
        }
        mock_response = mock.Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = github_response_data

        with mock.patch('requests.get', return_value=mock_response):
            response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.user.id)
        self.assertEqual(response.data['username'], self.user.username)
        self.assertEqual(response.data['name'], self.user.name)
        self.assertEqual(response.data['last_name'], self.user.last_name)
        self.assertEqual(response.data['email'], self.user.email)
        self.assertEqual(response.data['gender'], self.user.gender)
        self.assertEqual(response.data['public_repos'], github_response_data['public_repos'])
        self.assertEqual(response.data['followers'], github_response_data['followers'])
        self.assertEqual(response.data['following'], github_response_data['following'])
        self.assertEqual(response.data['github_profile_url'], github_response_data['html_url'])