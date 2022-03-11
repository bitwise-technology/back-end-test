import requests
from Usuarios import Usuario
import Verificar_usuarios_entidades
def informacoes_usuarios(GitHub,opcao):

    if opcao==1: #Registro atraves do github
        Usuario(GitHub['login'],GitHub['name'],"Null",GitHub['avatar_url'],GitHub['bio'],'Null','Not Specified')
        # As informações que estão em null não é publica no Api do GitHub

    elif opcao==2:#Consulta atraves da api do github


        informacoes=['name','followers','following','public_repos','html_url']
        nome_informacoes=["Nome do usuário:","Quantidade de Followers: ","Quantidade de Following: ","Quantidade de repositorios publicos: ","URL publica : "]



        for i in range(len(informacoes)):
            info = GitHub[informacoes[i]]
            print(nome_informacoes[i],info)


def cadastro_usuario():
    username = input("Informe seu username: ")
    Verificar_usuarios_entidades.validar_entidades(username,"username",5,30,1)
    name = input("Informe seu nome: ")
    tamanho = len(name)
    if tamanho != 0:
        Verificar_usuarios_entidades.validar_entidades(name,"name",3,30,1)
    lastName = input("Informe seu sobrenome (opcional): ")
    tamanho = len(lastName)
    if tamanho != 0:
       Verificar_usuarios_entidades.validar_entidades(lastName, "sobrenome", 3, 30, 2)
    bio = input("Informe a sua bio (opcional): ")
    tamanho = len(bio)
    if tamanho != 0:
       Verificar_usuarios_entidades.validar_entidades(name, "name", 3, 30, 2)
    email = input("Informe seu email: ")
    gender = input("Informe seu genero (opcional): ")
    tamanho = len(gender)
    if tamanho != 0:
       gender = 'Not Specified'
    Usuario(username,name,lastName,bio,email,gender)


