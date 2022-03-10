import Consultar_Informações
import Realizar_Cadastro
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
    escolha=int(input("Escolha uma das opções acima: "))
    if escolha == 1:
        print(escolha)
    elif escolha == 2:
        print(escolha)
    elif escolha == 3:
        print(escolha)
    elif escolha == 4:

        while True:
            opcao=int(input("Digite 1 para o username ou 2 para o email: "))
            if opcao == 1:
                username = input("Informe seu username do GitHub: ")
                Consultar_Informações.informacoes_usuarios(username)

            elif opcao == 2:
                email = input("Informe seu email do GitHub : ")
                Consultar_Informações.informacoes_usuarios_email(email)
            else:
                print("Escolha uma opção valida!")

    elif escolha == 0:
        print("Obrigado !")
        break
    else:
        print("Opção invalida, escolha novamente!!")
