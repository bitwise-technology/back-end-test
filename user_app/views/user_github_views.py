from user_app.models import UserGithub
from rest_framework import generics, status
from user_app.serializers import UserCreateFromGithubSerializer
import requests
from rest_framework.response import Response

class UserCreateViewFromGithub(generics.CreateAPIView):
    serializer_class = UserCreateFromGithubSerializer

    def create(self, request, *args, **kwargs):
        github_username = request.data.get('login')
        if not github_username:
            return Response({'error': 'Github username is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        github_api = f'https://api.github.com/users/{github_username}'

        try:
            response = requests.get(github_api)

            if response.status_code == 200:
                github_user_data = response.json()

                user = UserGithub.objects.create(
                    login = github_user_data.get('login'),
                    name = github_user_data.get('name'),
                    avatar_url = github_user_data.get('avatar_url'),
                    company = github_user_data.get('company'),
                    blog = github_user_data.get('blog'),
                    location = github_user_data.get('location'),
                    email = github_user_data.get('email'),
                    bio = github_user_data.get('bio'),
                    public_repos = github_user_data.get('public_repos'),
                    followers = github_user_data.get('followers'),
                    following = github_user_data.get('following'),
                )
                

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

                return Response(response_data, status=status.HTTP_201_CREATED)
            

            elif response.status_code == 404:

                suggestions = ['user1', 'user2', 'user3']
                response_data = {
                    'message': 'User not found',
                    'suggestions':suggestions
                }

                return Response(response_data, status=status.HTTP_404_NOT_FOUND)
        except request.exceptions.RequestException as e:
            return Response({'error': f'Failed to fetch Github user data: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class UserGithubDetailByUsernameView(generics.RetrieveAPIView):
    queryset = UserGithub.objects.all()
    serializer_class = UserCreateFromGithubSerializer
    lookup_field = 'login'
