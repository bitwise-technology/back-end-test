from user_app.models import UserGithub
import requests
import random

URL_API_GITHUB = 'https://api.github.com/users/'

class GitHubService():
    @staticmethod
    def get_github_data(username):
        github_api = f'{URL_API_GITHUB}{username}'

        try:
            response = requests.get(github_api)

            if response.status_code == 200:
                return response.json()
            else:
                return None
        except requests.exceptions.RequestException:
            return None
        

    @staticmethod
    def create_user_from_github_api(github_data):
        user = UserGithub.objects.create(
            login = github_data.get('login'),
            name = github_data.get('name'),
            avatar_url = github_data.get('avatar_url'),
            company = github_data.get('company'),
            blog = github_data.get('blog'),
            location = github_data.get('location'),
            email = github_data.get('email'),
            bio = github_data.get('bio'),
            public_repos = github_data.get('public_repos'),
            followers = github_data.get('followers'),
            following = github_data.get('following'),
        )

        return user
    
    @staticmethod
    def response_data_user(user):
        response_data = {
                'message': 'User saved successfully',
                'user': {
                    'id': user.id,
                    'login': user.login,
                    'name': user.name,
                    'avatar_url': user.avatar_url,
                    'company': user.company,
                    'blog': user.blog,
                    'location': user.location,
                    'email': user.email,
                    'bio': user.bio,
                    'public_repos': user.public_repos,
                    'followers': user.followers,
                    'following': user.following
                }
            }
        return response_data
    