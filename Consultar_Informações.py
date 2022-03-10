import requests

def informacoes_usuarios(user):
    GitHub = requests.get("https://api.github.com/users/" + user)
    GitHub = GitHub.json()

    informacoes=['name','followers','following','public_repos','html_url']
    nome_informacoes=["Nome do usuário:","Quantidade de Followers: ","Quantidade de Following: ","Quantidade de repositorios publicos: ","URL publica : "]

    for i in range(len(informacoes)):
        info = GitHub[informacoes[i]]
        print(nome_informacoes[i],info)


def informacoes_usuarios_email(email):
    GitHub = requests.patch("https://api.github.com//user/"+email+"/ visibility")
    GitHub = GitHub.json()
    print(GitHub)
