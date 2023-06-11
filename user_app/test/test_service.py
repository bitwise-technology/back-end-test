from unittest import mock

import requests
from django.test import TestCase

from user_app.models import UserGithub
from user_app.services.github_service import GitHubService


class GitHubServiceTestCase(TestCase):
    @mock.patch('requests.get')
    def test_get_github_data_success(self, mock_get):
        response_json = {
            'login': 'username_teste',
            'name': 'Name Test',
            'avatar_url': 'https://example.com/avatar.jpg',
            'company': 'Company Test',
            'blog': 'https://example.com/blog',
            'location': 'Location Test',
            'email': 'test@example.com',
            'bio': 'Bio Test',
            'public_repos': 10,
            'followers': 20,
            'following': 30
        }
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = response_json

        github_data = GitHubService.get_github_data('username_teste')

        mock_get.assert_called_once_with('https://api.github.com/users/username_teste')
        self.assertEqual(github_data, response_json)

    @mock.patch('requests.get')
    def test_get_github_data_failure(self, mock_get):
        mock_get.side_effect = requests.exceptions.RequestException

        github_data = GitHubService.get_github_data('username_teste')
        self.assertIsNone(github_data)

    def test_create_user_from_github_api(self):
        github_data = {
            'login': 'username_teste',
            'name': 'Name Test',
            'avatar_url': 'https://example.com/avatar.jpg',
            'company': 'Company Test',
            'blog': 'https://example.com/blog',
            'location': 'Location Test',
            'email': 'test@example.com',
            'bio': 'Bio Test',
            'public_repos': 10,
            'followers': 20,
            'following': 30
        }

        user = GitHubService.create_user_from_github_api(github_data)

        self.assertIsInstance(user, UserGithub)
        self.assertEqual(user.login, 'username_teste')
        self.assertEqual(user.name, 'Name Test')
        self.assertEqual(user.avatar_url, 'https://example.com/avatar.jpg')
        self.assertEqual(user.company, 'Company Test')
        self.assertEqual(user.blog, 'https://example.com/blog')
        self.assertEqual(user.location, 'Location Test')
        self.assertEqual(user.email, 'test@example.com')
        self.assertEqual(user.bio, 'Bio Test')
        self.assertEqual(user.public_repos, 10)
        self.assertEqual(user.followers, 20)
        self.assertEqual(user.following, 30)

    def test_response_data_user(self):
        user = UserGithub(
            login='username_teste',
            name='Name Test',
            avatar_url='https://example.com/avatar.jpg',
            company='Company Test',
            blog='https://example.com/blog',
            location='Location Test',
            email='test@example.com',
            bio='Bio Test',
            public_repos=10,
            followers=20,
            following=30
        )
        response_data = GitHubService.response_data_user(user)

        expected_response_data = {
            'message': 'User saved successfully',
            'user': {
                'id': user.id,
                'login': 'username_teste',
                'name': 'Name Test',
                'avatar_url': 'https://example.com/avatar.jpg',
                'company': 'Company Test',
                'blog': 'https://example.com/blog',
                'location': 'Location Test',
                'email': 'test@example.com',
                'bio': 'Bio Test',
                'public_repos': 10,
                'followers': 20,
                'following': 30
            }
        }
        self.assertEqual(response_data, expected_response_data)
