import requests
def validar_usuario_git(user):
    try:
        GitHub = requests.get("https://api.github.com/users/" + user)
        GitHub = GitHub.json()
        validado = GitHub['name']
        print(validado)
        print("Usuário validado!")
        return True
    except:
       return False

def validar_entidades(palavra,enti,menor, maior, alfanumerico_ou_letras):
    tamanho = len(palavra)

    if palavra >= menor and palavra <= maior:
        if alfanumerico_ou_letras == 1:
            return True;
        elif alfanumerico_ou_letras == 2:
            for i in range(len(palavra)):
                if palavra[i]=='0' or palavra[i]=='1' or palavra[i]=='2' or palavra[i]=='3' or palavra[i]=='4' or palavra[i]=='5' or palavra[i]=='6' or palavra[i]=='7' or palavra[i]=='8' or palavra[i]=='9':
                    print("Essa entidade só aceita letras!")
                    entidade = input("Informe a entidade novamente! ("+enti+")")
                    validar_entidades(entidade,enti,menor,maior,alfanumerico_ou_letras)
            return True