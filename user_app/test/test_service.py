from unittest import mock

import requests
from django.test import TestCase
from faker import Faker

from user_app.models import UserGithub
from user_app.services.github_service import GitHubService


class GitHubServiceTestCase(TestCase):
    def setUp(self):
        self.faker = Faker()

    @mock.patch("requests.get")
    def test_get_github_data_success(self, mock_get):
        response_json = {
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
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = response_json

        github_data = GitHubService.get_github_data("username_teste")

        mock_get.assert_called_once_with("https://api.github.com/users/username_teste")
        self.assertEqual(github_data, response_json)

    @mock.patch("requests.get")
    def test_get_github_data_failure(self, mock_get):
        mock_get.side_effect = requests.exceptions.RequestException

        github_data = GitHubService.get_github_data("username_teste")
        self.assertIsNone(github_data)

    def test_create_user_from_github_api(self):
        github_data = {
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

        user = GitHubService.create_user_from_github_api(github_data)

        self.assertIsInstance(user, UserGithub)
        self.assertEqual(user.login, github_data["login"])
        self.assertEqual(user.name, github_data["name"])
        self.assertEqual(user.avatar_url, github_data["avatar_url"])
        self.assertEqual(user.company, github_data["company"])
        self.assertEqual(user.blog, github_data["blog"])
        self.assertEqual(user.location, github_data["location"])
        self.assertEqual(user.email, github_data["email"])
        self.assertEqual(user.bio, github_data["bio"])
        self.assertEqual(user.public_repos, github_data["public_repos"])
        self.assertEqual(user.followers, github_data["followers"])
        self.assertEqual(user.following, github_data["following"])

    def test_response_data_user(self):
        user = UserGithub(
            login=self.faker.user_name(),
            name=self.faker.first_name(),
            avatar_url=self.faker.image_url(),
            company=self.faker.company(),
            blog=self.faker.url(),
            location=self.faker.city(),
            email=self.faker.email(),
            bio=self.faker.text(),
            public_repos=self.faker.random_int(min=1, max=100),
            followers=self.faker.random_int(min=1, max=100),
            following=self.faker.random_int(min=1, max=100),
        )
        response_data = GitHubService.response_data_user(user)

        expected_response_data = {
            "message": "User saved successfully",
            "user": {
                "id": user.id,
                "login": user.login,
                "name": user.name,
                "avatar_url": user.avatar_url,
                "company": user.company,
                "blog": user.blog,
                "location": user.location,
                "email": user.email,
                "bio": user.bio,
                "public_repos": user.public_repos,
                "followers": user.followers,
                "following": user.following,
            },
        }
        self.assertEqual(response_data, expected_response_data)
