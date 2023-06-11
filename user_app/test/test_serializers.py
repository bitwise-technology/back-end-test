from django.test import TestCase
from faker import Faker

from user_app.serializers import (UserCreateFromGithubSerializer,
                                  UserGithubViewSerializer, UserSerializer)


class UserSerializerTest(TestCase):
    def setUp(self):
        self.faker = Faker()

    def test_user_serializer(self):
        data = {
            "username": self.faker.user_name(),
            "name": self.faker.first_name(),
            "last_name": self.faker.last_name(),
            "profile_image_url": self.faker.image_url(),
            "bio": "",
            "email": self.faker.email(),
            "gender": self.faker.random_element(["Male", "Female"]),
        }
        serializer = UserSerializer(data=data)
        serializer.is_valid()
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.data["username"], data["username"])
        self.assertEqual(serializer.data["name"], data["name"])
        self.assertEqual(serializer.data["last_name"], data["last_name"])
        self.assertEqual(
            serializer.data["profile_image_url"], data["profile_image_url"]
        )

        self.assertEqual(serializer.data["bio"], data["bio"])
        self.assertEqual(serializer.data["email"], data["email"])
        self.assertEqual(serializer.data["gender"], data["gender"])

    def test_failed_user_serializer(self):
        data = {
            "username": "",
            "name": self.faker.first_name(),
            "last_name": self.faker.last_name(),
            "profile_image_url": self.faker.image_url(),
            "bio": self.faker.text(),
            "email": "",
            "gender": self.faker.random_element(["Male", "Female"]),
        }

        serializer = UserSerializer(data=data)
        serializer.is_valid()

        self.assertFalse(serializer.is_valid())
        self.assertEqual(serializer.data["username"], "")
        self.assertEqual(serializer.data["email"], "")

    def test_user_github_serializer(self):
        data = {
            "login": self.faker.user_name(),
            "name": self.faker.first_name(),
            "avatar_url": self.faker.image_url(),
            "company": self.faker.company(),
            "blog": self.faker.url(),
            "location": self.faker.city(),
            "email": self.faker.email(),
            "bio": self.faker.text(),
            "public_repos": self.faker.random_int(min=1, max=100),
            "followers": self.faker.random_int(min=1, max=100),
            "following": self.faker.random_int(min=1, max=100),
        }

        serializer = UserGithubViewSerializer(data=data)
        serializer.is_valid()

        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.data["login"], data["login"])
        self.assertEqual(serializer.data["name"], data["name"])
        self.assertEqual(serializer.data["avatar_url"], data["avatar_url"])
        self.assertEqual(serializer.data["company"], data["company"])
        self.assertEqual(serializer.data["blog"], data["blog"])
        self.assertEqual(serializer.data["location"], data["location"])
        self.assertEqual(serializer.data["email"], data["email"])
        self.assertEqual(serializer.data["bio"], data["bio"])
        self.assertEqual(serializer.data["public_repos"], data["public_repos"])
        self.assertEqual(serializer.data["followers"], data["followers"])
        self.assertEqual(serializer.data["following"], data["following"])

    def test_failed_user_github_serializer(self):
        data = {
            "login": "",
            "name": self.faker.first_name(),
            " avatar_url": self.faker.image_url(),
            "company": self.faker.company(),
            "blog": self.faker.url(),
            "location": self.faker.city(),
            "email": self.faker.email(),
            "bio": self.faker.text(),
            "public_repos": self.faker.random_int(min=1, max=100),
            "followers": self.faker.random_int(min=1, max=100),
            "following": self.faker.random_int(min=1, max=100),
        }

        serializer = UserGithubViewSerializer(data=data)
        serializer.is_valid()

        self.assertFalse(serializer.is_valid())
        self.assertEqual(serializer.data["login"], "")

    def test_user_create_from_github_serializer(self):
        data = {
            "login": "username_test",
        }

        serializer = UserCreateFromGithubSerializer(data=data)
        serializer.is_valid()

        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.data["login"], "username_test")

    def test_failed_user_create_from_github_serializer(self):
        data = {
            "login": "",
        }

        serializer = UserCreateFromGithubSerializer(data=data)
        serializer.is_valid()

        self.assertFalse(serializer.is_valid())
        self.assertEqual(serializer.data["login"], "")
