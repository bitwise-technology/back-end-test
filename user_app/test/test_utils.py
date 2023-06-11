from unittest import mock

from django.test import TestCase

from user_app.views.utils_views import get_suggested_usernames


class UtilsViewsTestCase(TestCase):
    @mock.patch("requests.get")
    def test_get_suggested_usernames(self, mock_get):
        response_json = [
            {"login": "user1"},
            {"login": "user2"},
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
