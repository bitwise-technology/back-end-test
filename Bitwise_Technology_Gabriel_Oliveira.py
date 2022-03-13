import Consultar_Informações_Cadastro
import requests
import Verificar_usuarios_entidades
import Banco_de_dados
import os

# Criando o banco de dados
create_db = not os.path.isfile('Bitwise_Gabriel_Oliveira.db')
if create_db:
  Banco_de_dados.criar_BD()

while True:
    print('-----------------------------------------------')
    print("Bitwise - Desafio Backend")
    print("Menu de escolha")
    print("1 - Realizar cadastro do usuário")
    print("2 - Realizar cadastro do usuário usando as informaçoes disponiveis no Github")
    print("3 - Realizar update das informaçoes do usuário")
    print("4 - Consultar informaçoes de um determinado usúario por email ou username")
    print("0 - Sair da aplicação")
    print('-----------------------------------------------')
    try:
        escolha=int(input("Escolha uma das opções acima: "))
        if escolha == 1:
            Consultar_Informações_Cadastro.cadastro_usuario()
        elif escolha == 2:
            while True:
                username = input("Informe seu username do GitHub: ")
                valido = Verificar_usuarios_entidades.validar_usuario_git(username)
                if valido == True:
                    GitHub = requests.get("https://api.github.com/users/" + username)
                    GitHub = GitHub.json()
                    Consultar_Informações_Cadastro.informacoes_usuarios(GitHub, 1)

                else:
                    print("Usuario invalido ou já cadastrado!Digite novamente")
                break
        elif escolha == 3:
            while True:
                username = input("Informe seu username do GitHub: ")
                valido = Banco_de_dados.update_registros(username)

        elif escolha == 4:

            while True:
                opcao=int(input("Digite 1 para o username ou 2 para o email: "))
                if opcao == 1:
                    while True:
                        username = input("Informe seu username do GitHub: ")
                        valido = Verificar_usuarios_entidades.validar_usuario_git(username)
                        if valido == True:
                            GitHub = requests.get("https://api.github.com/users/" + username)
                            GitHub = GitHub.json()
                            Consultar_Informações_Cadastro.informacoes_usuarios(GitHub,2)
                        else:
                            print("Usuario invalido!Digite novamente")
                        break

                    break
                elif opcao == 2:
                    email = input("Informe seu email do GitHub : ")

                    break
                else:
                    print("Escolha uma opção valida!")

        elif escolha == 0:
            print("Obrigado !")
            break
    except:
        print("Opção invalida, escolha novamente!!")
