import requests
import Banco_de_dados
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

def validar_entidades(palavra,menor, maior, alfanumerico_ou_letras):
    tamanho = len(palavra)
    pala =  palavra
    lista = list(pala)

    if tamanho >= menor and tamanho <= maior:
        if alfanumerico_ou_letras == 1:
            return True
        elif alfanumerico_ou_letras == 2:
            for i in range(len(lista)):
                if lista[i]=='0' or lista[i]=='1' or lista[i]=='2' or lista[i]=='3' or lista[i]=='4' or lista[i]=='5' or lista[i]=='6' or lista[i]=='7' or lista[i]=='8' or lista[i]=='9':
                    print("Essa entidade só aceita letras!")
                    return False

    return True