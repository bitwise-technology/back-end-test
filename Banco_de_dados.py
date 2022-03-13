from contextlib import closing
import sqlite3

def criar_BD() -> None:
    with sqlite3.connect('Bitwise_Gabriel_Oliveira.db') as conn:
        with closing(conn.cursor()) as cursor:
            cursor.execute('PRAGMA foreign_keys = ON;')

            cursor.execute('''
                        CREATE TABLE Usuario(
                            id_usuario INTEGER primary key AUTOINCREMENT ,
                            username VARCHAR (30) NOT NULL,
                            name VARCHAR(30) NOT NULL,
                            lastName VARCHAR (30),
                            profileImageUrl VARCHAR (50),
                            bio VARCHAR (30),
                            email VARCHAR (30) NOT NULL ,
                            gender VARCHAR(15) NOT NULL,
                            followers INTEGER,
                            following INTEGER,
                            repositoriosPublicos INTEGER ,
                            urlProfile VARCHAR (50)
                            )'''
                           )


            conn.commit()


def add_usuario(username: str, name :str, lastName: str, profileImageUrl: str,bio: str,email:str,gender:str,followers:int,following:int, repositoriosPublicos:int,urlProfile:str ) -> int:
    with sqlite3.connect('Bitwise_Gabriel_Oliveira.db') as conn:
        with closing(conn.cursor()) as cursor:
            cursor.execute('PRAGMA foreign_keys = ON;')
            cursor.execute('''SELECT id_usuario  FROM Usuario WHERE username = ?''',(username,))
            result = cursor.fetchone()
            if result == None:
                cursor.execute('''INSERT INTO Usuario (username, name, lastName, profileImageUrl,bio,email,gender,followers,following, repositoriosPublicos,urlProfile)
                VALUES(?,?,?,?,?,?,?,?,?,?,?)''',(username,name,lastName,profileImageUrl,bio,email,gender,followers,following,repositoriosPublicos,urlProfile))

                conn.commit()
                print("Usuário adicionado!")

            else:
                print("Usuario cadastrado no nosso Banco de dados")
                print(result)
                conn.commit()


def update_registros(user):
    with sqlite3.connect('Bitwise_Gabriel_Oliveira.db') as conn:
        with closing(conn.cursor()) as cursor:
            cursor.execute('PRAGMA foreign_keys = ON;')
            cursor.execute('''SELECT id_usuario  FROM Usuario WHERE username = ?''', (user,))

            result = cursor.fetchone()
            if result == None:
                print("Não é possivel fazer o update, pois o usuario não estar cadastrado na base de dados!")
                return False
            else:
                print("Usuário apto para fazer o update")
                print("Qual o registro que você deseja fazer o update?")
                print("1- Username")
                print("2- Nome")
                print("3- Sobrenome")
                print("4- Url de perfil")
                print("5- Bio")
                print("6- Email")
                print("7- Genero")
                print("0 - Retornar para o menu")
                opcao = int(input("Escolha uma opção:"))
                if opcao ==1:
                    username = input("Informe o novo Username:")
                    cursor.execute('PRAGMA foreign_keys = ON;')
                    cursor.execute("Update Usuario SET username = ? WHERE username = ? ",(username, user,))
                    print("Username atualizado com sucesso!")
                elif opcao==2:
                    nome = input("Informe o novo nome:")
                    cursor.execute('PRAGMA foreign_keys = ON;')
                    cursor.execute("Update Usuario SET name = ? WHERE username = ? ", (nome, user,))
                    print("Nome atualizado com sucesso!")
                elif opcao == 3:
                    sobrenome = input("Informe o novo sobrenome:")
                    cursor.execute('PRAGMA foreign_keys = ON;')
                    cursor.execute("Update Usuario SET lastName = ? WHERE username = ? ", (sobrenome, user,))
                    print("Sobrenome atualizado com sucesso!")
                elif opcao==4:
                    Url_Perfil = input("Informe a nova url do perfil:")
                    cursor.execute('PRAGMA foreign_keys = ON;')
                    cursor.execute("Update Usuario SET profileImageUrl = ? WHERE username = ? ", (Url_Perfil, user,))
                    print("Url de perfil atualizado com sucesso!")
                elif opcao==5:
                    bio = input("Informe a nova bio:")
                    cursor.execute('PRAGMA foreign_keys = ON;')
                    cursor.execute("Update Usuario SET bio = ? WHERE username = ? ", (bio, user,))
                    print("Bio atualizado com sucesso!")
                elif opcao==6:
                    email = input("Informe o novo email:")
                    cursor.execute('PRAGMA foreign_keys = ON;')
                    cursor.execute("Update Usuario SET email = ? WHERE username = ? ", (email, user,))
                    print("Email atualizado com sucesso!")
                elif opcao ==7:
                    genero = input("Informe o novo genero:")
                    cursor.execute('PRAGMA foreign_keys = ON;')
                    cursor.execute("Update Usuario SET gender = ? WHERE username = ? ", (genero, user,))
                    print("Genero atualizado com sucesso!")
                conn.commit()