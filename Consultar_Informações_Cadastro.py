import Verificar_usuarios_entidades
import Banco_de_dados
def informacoes_usuarios(GitHub,opcao):

    if opcao==1: #Registro atraves do github
        Banco_de_dados.add_usuario(GitHub['login'],GitHub['name'],"Null",GitHub['avatar_url'],GitHub['bio'],'Null','Not Specified',GitHub['followers'],GitHub['following']
                                   ,GitHub['public_repos'],GitHub['html_url'])
        return


    elif opcao==2:#Consulta atraves da api do github

        informacoes=['name','followers','following','public_repos','html_url']
        nome_informacoes=["Nome do usuário:","Quantidade de Followers: ","Quantidade de Following: ","Quantidade de repositorios publicos: ","URL publica : "]

        for i in range(len(informacoes)):
            info = GitHub[informacoes[i]]
            print(nome_informacoes[i],info)

def cadastro_usuario():
    print("-------------------------------------------------------------")
    print("                   CADASTRO DE USUÁRIO                       ")
    while True:
        username = input("Informe seu username: ")
        tamanho = len(username)
        if tamanho!=0:
            ok=Verificar_usuarios_entidades.validar_entidades(username,"username",5,30,1)
            if ok==True:
                break
        elif tamanho==0:
            print("O username é uma entidade obrigatória!")
    while True:
        name = input("Informe seu nome: ")
        tamanho = len(name)
        if tamanho != 0:
           ok=Verificar_usuarios_entidades.validar_entidades(name,"name",3,30,2)
           if ok==True:
                break
        elif tamanho == 0:
            print("O nome é uma entidade obrigatória!")

    while True:
        lastName = input("Informe seu sobrenome (opcional): ")
        tamanho = len(lastName)
        if tamanho != 0:
           ok=Verificar_usuarios_entidades.validar_entidades(lastName, "sobrenome", 3, 30, 2)
           if ok == True:
               break
        break
    while True:
        bio = input("Informe a sua bio (opcional): ")
        tamanho = len(bio)
        if tamanho != 0:
           ok=Verificar_usuarios_entidades.validar_entidades(name, "name", 3, 30, 2)
           if ok == True:
               break
        break
    email = input("Informe seu email: ")
    gender = input("Informe seu genero (opcional): ")
    tamanho = len(gender)
    if tamanho == 0:
       gender = 'Not Specified'



