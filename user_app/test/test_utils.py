from unittest import mock

from django.test import TestCase
from faker import Faker

from user_app.views.utils_views import get_suggested_usernames


class UtilsViewsTestCase(TestCase):
    def setUp(self):
        self.faker = Faker()

    @mock.patch("requests.get")
    def test_get_suggested_usernames(self, mock_get):
        response_json = [
            {"login": self.faker.user_name(),},
            {"login": self.faker.user_name(),},
        ]

        mock_response = mock.Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = response_json
        mock_get.return_value = mock_response

        suggested_usernames = get_suggested_usernames()

        mock_get.assert_called_once_with(
            "https://api.github.com/users", params={"since": mock.ANY}
        )
        self.assertEqual(len(suggested_usernames), 2)
