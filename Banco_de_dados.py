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
                            gender VARCHAR (15),
                            followers INTEGER,
                            following INTEGER,
                            repositoriosPublicos INTEGER ,
                            urlProfile VARCHAR (50),
                            )'''
                           )

            conn.commit()

def add_usuario(username: str, name :str, lastName: str, profileImageUrl: str,bio: str,email:str,gender:str,followers:int,following:int, repositoriosPublicos:int,urlProfile:str ) -> int:
    with sqlite3.connect('Bitwise_Gabriel_Oliveira.db') as conn:
        with closing(conn.cursor()) as cursor:
            cursor.execute('PRAGMA foreign_keys = ON;')
            cursor.execute('''SELECT id_usuario FROM Usuario WHERE name = ?''',(username,))
            result = cursor.fetchone()
            if result == None:
                cursor.execute('''INSERT INTO Usuario (username, name, lastName, profileImageUrl,bio,email,gender,followers,following, repositoriosPublicos,urlProfile)
                VALUES(?,?,?,?,?,?,?,?,?,?,?)''',(username,name,lastName,profileImageUrl,bio,email,gender,followers,following,repositoriosPublicos,urlProfile))

                conn.commit()
                return result[0]

            else:
                conn.commit()
                return result[0]

