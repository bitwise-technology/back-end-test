from django.test import TestCase
from faker import Faker

from user_app.models import User, UserGithub


class UserModelTest(TestCase):
    def setUp(self):
        self.faker = Faker()

    def test_create_user(self):
        username = self.faker.user_name()
        name = self.faker.first_name()
        last_name = self.faker.last_name()
        profile_image_url = ""
        bio = ""
        email = self.faker.email()
        gender = self.faker.random_element(["Male", "Female"])

        user = User.objects.create(
            username=username,
            name=name,
            last_name=last_name,
            profile_image_url=profile_image_url,
            bio=bio,
            email=email,
            gender=gender,
        )

        self.assertEqual(user.username, username)
        self.assertEqual(user.name, name)
        self.assertEqual(user.last_name, last_name)
        self.assertEqual(user.profile_image_url, profile_image_url)
        self.assertEqual(user.bio, bio)
        self.assertEqual(user.email, email)
        self.assertEqual(user.gender, gender)

    def test_create_user_github(self):
        login = self.faker.user_name()
        name = self.faker.first_name()
        avatar_url = ""
        company = ""
        blog = ""
        location = ""
        email = ""
        bio = self.faker.text()
        public_repos = self.faker.random_int(min=1, max=100)
        followers = self.faker.random_int(min=1, max=100)
        following = self.faker.random_int(min=1, max=100)

        user_github = UserGithub.objects.create(
            login=login,
            name=name,
            avatar_url=avatar_url,
            company=company,
            blog=blog,
            location=location,
            email=email,
            bio=bio,
            public_repos=public_repos,
            followers=followers,
            following=following,
        )

        self.assertEqual(user_github.login, login)
        self.assertEqual(user_github.name, name)
        self.assertEqual(user_github.avatar_url, avatar_url)
        self.assertEqual(user_github.company, company)
        self.assertEqual(user_github.blog, blog)
        self.assertEqual(user_github.location, location)
        self.assertEqual(user_github.email, email)
        self.assertEqual(user_github.bio, bio)
        self.assertEqual(user_github.public_repos, public_repos)
        self.assertEqual(user_github.followers, followers)
        self.assertEqual(user_github.following, following)
