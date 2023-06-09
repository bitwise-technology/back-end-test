from django.test import TestCase
from user_app.models import User, UserGithub


class UserModelTest(TestCase):
    
    def test_create_user(self):
        user = User.objects.create(
            username='testuser',
            name='Test User',
            last_name='Last Name',
            profile_image_url='https://example.com/profile.jpg',
            bio='User bio',
            email='test@example.com',
            gender='Male'
        )

        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.name, 'Test User')
        self.assertEqual(user.last_name, 'Last Name')
        self.assertEqual(user.profile_image_url, 'https://example.com/profile.jpg')
        self.assertEqual(user.bio, 'User bio')
        self.assertEqual(user.email, 'test@example.com')
        self.assertEqual(user.gender, 'Male')

    def test_create_user_github(self):
        user_github = UserGithub.objects.create(
            login='username_test',
            name='Test User',
            avatar_url='https://example.com/avatar.jpg',
            company='Company',
            blog='https://example.com/blog',
            location='Location',
            email='test@example.com',
            bio='User bio',
            public_repos=10,
            followers=20,
            following=30
        )

        self.assertEqual(user_github.login, 'username_test')
        self.assertEqual(user_github.name, 'Test User')
        self.assertEqual(user_github.avatar_url, 'https://example.com/avatar.jpg')
        self.assertEqual(user_github.company, 'Company')
        self.assertEqual(user_github.blog, 'https://example.com/blog')
        self.assertEqual(user_github.location, 'Location')
        self.assertEqual(user_github.email, 'test@example.com')
        self.assertEqual(user_github.bio, 'User bio')
        self.assertEqual(user_github.public_repos, 10)
        self.assertEqual(user_github.followers, 20)
        self.assertEqual(user_github.following, 30)