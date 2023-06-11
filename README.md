# Bitwise - Desafio Backend

Repositório dedicado ao desafio da Bitwise.

### Como executar o projeto:

1. Faça o git clone desse repositorio:
```console
git clone https://github.com/bitwise-technology/back-end-test.git
```
2. Criar ambiente virtual:
- Windows
```console
python -m venv venv
```
- Linux ou macOS 
```console
python3 -m venv venv
```

3. Ativar ambiente virtual:
- Windows
```console
cd venv/Scripts
```
- caso use o powershell
```console
./activate 
```
- caso use o cmd
```console
activate
```
- Linux ou macOS 
```console
source venv/bin/activate
```

4. Instale as dependências:
```console
pip install -r requirements.txt
```

5. Criar arquivo .env:
Copie e cole a variável SECRET_KEY que está  no .env.example para o seu .env. Em seguida, no seu terminal execute o seguinte comando:

```console
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```
Irá ser gerado um uma chave onde você poderá copiar e colar  como valor da SECRET_KEY no seu .env.
6. Execute os migrações:
```console
python manage.py makemigrations
python manage.py migrate
```

7. Execute o servidor de desenvolvimento
```console
python manage.py runserver
```
8. Acesse a  documentação da api: http://localhost:8000/

9. Execute os testes:
```console
python manage.py test
```

## API endpoints

### Criar usuário
- ##### URL: http://127.0.0.1:8000/api/v1/user/create/
- ##### Método: POST
- ##### Body:
```console
{
    "username": "username_teste",
    "name": "name teste",
    "last_name": "last name teste",
    "profile_image_url": "https://teste.png",
    "bio": "bio teste",
    "email": "teste@gmail.com",
    "gender": "Male"
}


```
- ##### Response:
```console
{
    "message": "User saved successfully",
    "user": {
        "id": 3,
        "username": "username_teste",
        "name": "name teste",
        "last_name": "last name teste",
        "profile_image_url": "https://teste.png",
        "bio": "bio teste",
        "email": "teste@gmail.com",
        "gender": "Male"
    }
}


```

### Consultar informações de um usuário por email
- ##### URL: http://127.0.0.1:8000/api/v1/user/detail/email/{email}/
- ##### Método: GET
- ##### Parâmetros de URL: email do usuário
- ##### Response:
```console
{
    "id": 3,
    "username": "username_teste",
    "name": "name teste",
    "last_name": "last name teste",
    "profile_image_url": "https://teste.png",
    "bio": "bio teste",
    "email": "teste@gmail.com",
    "gender": "Male"
}
```
### Consultar informações de um usuário por username
- ##### URL: http://127.0.0.1:8000/api/v1/user/detail/username/{username}/
- ##### Método: GET
- ##### Parâmetros de URL: username do usuário
- ##### Response:
```console
{
    "id": 3,
    "username": "username_teste",
    "name": "name teste",
    "last_name": "last name teste",
    "profile_image_url": "https://teste.png",
    "bio": "bio teste",
    "email": "teste@gmail.com",
    "gender": "Male"
}


```

### Atualizando informações de um usuário
- ##### URL: http://127.0.0.1:8000/api/v1/user/update/{id}/
- ##### Método: PATCH/PUT
- ##### Parâmetros de URL: id do usuário
- ##### body:
```console
{
    "username": "new_username",
    "name": "new name teste",
    "last_name": "new last name teste",
    "profile_image_url": "https://newteste.png",
    "bio": "new bio teste",
    "email": "newsteste@gmail.com",
    "gender": "Female"
}


```
- ##### Response:
```console
{
    "message": "User updated successfully",
    "user": {
        "id": 3,
        "username": "new_username",
        "name": "new name teste",
        "last_name": "new last name teste",
        "profile_image_url": "https://newteste.png",
        "bio": "new bio teste",
        "email": "newsteste@gmail.com",
        "gender": "Female"
    }
}


```


### Buscar usuário por username
- ##### URL: http://127.0.0.1:8000/api/v1/user/search/{username}/
- ##### Método: GET
- ##### Parâmetros de URL: username do usuário


- ##### Response:
```console
{
  "count": 1,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "username": "Habby_Valle",
      "name": "Renildo Rabi",
      "last_name": "Vale Dos Santos",
      "profile_image_url": "https://a.espncdn.com/i/teamlogos/soccer/500/819.png",
      "bio": "Bio teste teste",
      "email": "habbyvale@gmail.com",
      "gender": "Male"
    }
  ]
}


```
- Campos obrigátorios: Username, name e email
---
### Criar usuário com o github
- ##### URL: http://127.0.0.1:8000/api/v1/github_user/create/
- ##### Método: POST
- ##### Body:
```console
{
    "login": "thechrisoshow"
}


```
- ##### Response:
```console
{
  "message": "User saved successfully",
  "user": {
    "id": 3,
    "login": "thechrisoshow",
    "name": "Chris O'Sullivan",
    "avatar_url": "https://avatars.githubusercontent.com/u/3727?v=4",
    "company": "Lexoo",
    "blog": "http://www.thechrisoshow.com",
    "location": "London",
    "email": null,
    "bio": "CTO and co-founder of https://www.lexoo.com  (take recurring legal work off your plate)",
    "public_repos": 55,
    "followers": 41,
    "following": 14
  }
}

  ```

- Quando um nome de usuário que não existe no github é inserido, é retornado uma lista de sugestões de usernames.
- ##### Response:
```console
{
  "message": "User not found",
  "suggestions": [
    "demonnic",
    "skizz",
    "atinypixel",
    "masaki",
    "btakita"
  ]
}
  ```


### Consultar informações de um usuário por login
- ##### URL: http://127.0.0.1:8000/api/v1/github_user/login/{login}/
- ##### Método: GET
- ##### Parâmetros de URL: email do usuário
- ##### Response:
```console
{
  "id": 3,
  "login": "thechrisoshow",
  "name": "Chris O'Sullivan",
  "avatar_url": "https://avatars.githubusercontent.com/u/3727?v=4",
  "company": "Lexoo",
  "blog": "http://www.thechrisoshow.com",
  "location": "London",
  "email": null,
  "bio": "CTO and co-founder of https://www.lexoo.com  (take recurring legal work off your plate)",
  "public_repos": 55,
  "followers": 41,
  "following": 14
}

  ```


### Atualizando informações de um usuário
- ##### URL: http://127.0.0.1:8000/api/v1/github_user/update/{id}/
- ##### Método: PATCH/PUT
- ##### Parâmetros de URL: id do usuário
- ##### body:
```console
{
  "login": "thechrisoshow",
  "name": "Chris O'Sullivan",
  "avatar_url": "https://avatars.githubusercontent.com/u/3727?v=4",
  "company": "Lexoo",
  "blog": "http://www.thechrisoshow.com",
  "location": "London",
  "email": "chris@gmail.com",
  "bio": "CTO and co-founder of https://www.lexoo.com  (take recurring legal work off your plate)",
  "public_repos": 55,
  "followers": 41,
  "following": 14
}

  ```
- ##### response:
```console
{
  "message": "User updated successfully",
  "user": {
    "id": 3,
    "login": "thechrisoshow",
    "name": "Chris O'Sullivan",
    "avatar_url": "https://avatars.githubusercontent.com/u/3727?v=4",
    "company": "Lexoo",
    "blog": "http://www.thechrisoshow.com",
    "location": "London",
    "email": "chris@gmail.com",
    "bio": "CTO and co-founder of https://www.lexoo.com  (take recurring legal work off your plate)",
    "public_repos": 55,
    "followers": 41,
    "following": 14
  }
}
```

### Buscar usuário por username
- ##### URL:http://127.0.0.1:8000/api/v1/github_user/search/{username}/
- ##### Método: GET
- ##### Parâmetros de URL: username do usuário


- ##### Response:
```console
	
{
  "count": 1,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "login": "Renildo15",
      "name": "Renildo Rabi Vale Dos Santos",
      "avatar_url": "https://avatars.githubusercontent.com/u/77634638?v=4",
      "company": "Universidade Federal Do Rio Grande Do Norte",
      "blog": "",
      "location": "Jucurutu",
      "email": "renildo@gmail.com",
      "bio": "Atualmente no 7° período do curso de Sistemas de Informação da UFRN",
      "public_repos": 66,
      "followers": 14,
      "following": 14
    }
  ]
}


```
