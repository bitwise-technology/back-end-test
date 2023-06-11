from django.test import TestCase

from user_app.serializers import (UserCreateFromGithubSerializer,
                                  UserGithubViewSerializer, UserSerializer)


class UserSerializerTest(TestCase):

    def test_user_serializer(self):

        data = {
            "username": "user_teste",
            "name": "Teste",
            "last_name": "One",
            "profile_image_url": "https://example.com/profile.jpg",
            "bio": "Bio teste",
            "email": "testeone@example.com",
            "gender": "Male"
        }

        serializer = UserSerializer(data=data)
        serializer.is_valid()

        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.data['username'], 'user_teste')
        self.assertEqual(serializer.data['name'], 'Teste')
        self.assertEqual(serializer.data['last_name'], 'One')
        self.assertEqual(serializer.data['profile_image_url'], 'https://example.com/profile.jpg')
        self.assertEqual(serializer.data['bio'], 'Bio teste')
        self.assertEqual(serializer.data['email'], 'testeone@example.com')
        self.assertEqual(serializer.data['gender'], 'Male')


    def test_failed_user_serializer(self):

        data = {
            "username": "",
            "name": "Teste",
            "last_name": "One",
            "profile_image_url": "https://example.com/profile.jpg",
            "bio": "Bio teste",
            "email": "",
            "gender": "Male"
        }

        serializer = UserSerializer(data=data)
        serializer.is_valid()

        self.assertFalse(serializer.is_valid())
        self.assertEqual(serializer.data['username'], '')
        self.assertEqual(serializer.data['email'], '')

    def test_user_github_serializer(self):
        data = {
            "login": "username_test",
            "name": "Teste name",
            "avatar_url":"https://example.com/avatar.jpg",
            "company":"company test",
            "blog":"https://example.com/blog",
            "location":"location teste",
            "email":"test@email.com",
            "bio":"teste teste",
            "public_repos":80,
            "followers":20,
            "following":30
        }

        serializer = UserGithubViewSerializer(data=data)
        serializer.is_valid()

        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.data['login'], 'username_test')
        self.assertEqual(serializer.data['name'], 'Teste name')
        self.assertEqual(serializer.data['avatar_url'], 'https://example.com/avatar.jpg')
        self.assertEqual(serializer.data['company'], 'company test')
        self.assertEqual(serializer.data['blog'], 'https://example.com/blog')
        self.assertEqual(serializer.data['location'], 'location teste')
        self.assertEqual(serializer.data['email'], 'test@email.com')
        self.assertEqual(serializer.data['bio'], 'teste teste')
        self.assertEqual(serializer.data['public_repos'], 80)
        self.assertEqual(serializer.data['followers'], 20)
        self.assertEqual(serializer.data['following'], 30)


    def test_failed_user_github_serializer(self):
        data = {
            "login": "",
            "name": "Teste name",
            "avatar_url":"https://example.com/avatar.jpg",
            "company":"company test",
            "blog":"https://example.com/blog",
            "location":"location teste",
            "email":"test@email.com",
            "bio":"teste teste",
            "public_repos":80,
            "followers":20,
            "following":30
        }

        serializer = UserGithubViewSerializer(data=data)
        serializer.is_valid()

        self.assertFalse(serializer.is_valid())
        self.assertEqual(serializer.data['login'], '')

    def test_user_create_from_github_serializer(self):

        data = {
        "login": "username_test",
        }

        serializer = UserCreateFromGithubSerializer(data=data)
        serializer.is_valid()

        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.data['login'], 'username_test')

    def test_failed_user_create_from_github_serializer(self):

        data = {
        "login": "",
        }

        serializer = UserCreateFromGithubSerializer(data=data)
        serializer.is_valid()

        self.assertFalse(serializer.is_valid())
        self.assertEqual(serializer.data['login'], '')