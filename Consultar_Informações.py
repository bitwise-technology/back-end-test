import pprint
import requests

def informacoes_usuarios(user):
    GitHub = requests.get("https://api.github.com/users/" + user)

    GitHub = GitHub.json()
    name = GitHub['name']
    followers = GitHub['followers']
    following = GitHub['following']
    repositorios =  GitHub['public_repos']
    url = GitHub['html_url']
    print("Nome do usuário:",name)
    print("Quantidade de Followers: ",followers)
    print("Quantidade de Following: ", following)
    print("Quantidade de repositorios publicos: ",repositorios)
    print("URL publica : ", url)
