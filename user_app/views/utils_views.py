import random
import requests
def get_suggested_usernames():

    github_api = 'https://api.github.com/users'
    since = random.randint(1, 5000)
    limit = 5
    
    response = requests.get(github_api, params={'since': since})
    github_user_data = response.json()

    suggestions = [user_data['login'] for user_data in github_user_data[:limit]]
    response_data = {
        'message': 'User not found',
        'suggestions':suggestions
    }

    return response_data