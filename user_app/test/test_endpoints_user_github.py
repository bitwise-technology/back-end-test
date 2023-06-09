from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from user_app.models import UserGithub 
from user_app.serializers import UserSerializer
from rest_framework.test import APIRequestFactory
from user_app.views.user_github_views import UserCreateViewFromGithub
from unittest import mock

class UserCreateViewFromGithubTest(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = UserGithub.objects.create(
            login = "username_teste",
            name = "name teste",
            avatar_url ="",
            company = "",
            blog = "",
            location = "",
            email = "",
            bio = "teste teste",
            public_repos = 80,
            followers = 10,
            following = 10
        )
    # def test_success_create_user_with_github(self):
        
    #     url = reverse("user:user_github_create_view")
    #     data = {"login": "username_teste"}

    #     response = self.client.post(url, data, format='json')

    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    #     self.assertEqual(response.data['message'], 'User saved successfully')

    def test_get_user_github_by_username(self):

        url = reverse("user:user_github_detail_username_view", kwargs={"login":self.user.login})
        
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['login'], self.user.login)

    def test_success_update_user(self):
        url = reverse('user:user_github_update_view', kwargs={'id': self.user.id})

        data = {
            "login": "newusername",
            "name": "new name",
            "avatar_url":"",
            "company":"",
            "blog":"",
            "location":"",
            "email":"",
            "bio":"teste teste",
            "public_repos":80,
            "followers":20,
            "following":30
        }

        response = self.client.put(url, data, format='json')
        

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'User updated successfully')
        self.assertEqual(response.data['user']['login'], 'newusername')
        self.assertEqual(response.data['user']['name'], 'new name')

    def test_failed_update_user(self):
        url = reverse('user:user_github_update_view', kwargs={'id': self.user.id})

        data = {
            "login": "",
            "name": "new name",
            "avatar_url":"",
            "company":"",
            "blog":"",
            "location":"",
            "email":"",
            "bio":"teste teste",
            "public_repos":80,
            "followers":20,
            "following":30
        }

        response = self.client.put(url, data, format='json')
        

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('login', response.data)