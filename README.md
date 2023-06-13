# Bitwise - Desafio Backend

Repositório dedicado ao desafio da Bitwise.
##  Executando o Projeto com Docker Compose
Este é um guia para executar o projeto usando o Docker Compose. O Docker Compose permite criar e executar o ambiente de desenvolvimento com todas as dependências do projeto de forma fácil e automatizada. Aqui estou usando o Postgres como banco de dados.


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
Caso tenja algum problema na instalação das dependencias, execute o comando abaixo.
```console
pip install -r requirements.txt --use-pep517
```

5. Criar arquivo .env:
Nesse caso só será necessário a SECRET_KEY. Copie e cole a variável SECRET_KEY que está em .env.example para o seu .env. Em seguida, no seu terminal execute o seguinte comando para criar:

```console
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```
Irá ser gerado um uma chave onde você poderá copiar e colar  como valor da SECRET_KEY no seu .env.

6. Crie um arquivo chamado .env na raiz do projeto e cole o conteúdo do .env.example:
```console

SECRET_KEY=
POSTGRES_DB= ''
POSTGRES_USER= ''
POSTGRES_PASSWORD= ''
DB_HOST= ''
DB_PORT=

```
Certifique-se de preencher corretamente os valores para cada variável de ambiente de acordo com as configurações do seu ambiente.

7. Crie um arquivo chamado .env.docker na raiz do projeto e cole o conteúdo do .env.docker.example:
```console
DEBUG=
SECRET_KEY=
ALLOWED_HOSTS=


POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
DB_HOST=
DB_PORT=

PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=
PGADMIN_CONFIG_SERVER_MODE=

```

  Da mesma forma, preencha as variáveis de ambiente com os valores corretos para o ambiente em que você está executando o projeto.

  Certifique-se de revisar e ajustar todas as variáveis de ambiente nos arquivos .env e .env.docker de acordo com a configuração do seu ambiente, como o nome do banco de dados, usuário, senha, host, porta, etc.

7. Execute o comando abaixo para coletar os arquivos estaticos:
```console
python manage.py collectstatic
```

8. Rodando os containers:
```console
docker compose up -d
```

9. Executando as migrations e migrates:
```console
docker container ls
docker container exec -it bitwise_app python manage.py makemigrations
docker container exec -it bitwise_app python manage.py migrate
```
10. Rodando os testes:
```console
docker container exec -it bitwise_app pytest --cov=user_app
```

11. Após a inicialização bem-sucedida dos contêineres, você poderá acessar o projeto em seu navegador usando o seguinte endereço:

```console

http://127.0.0.1:8000/
```
---
## Como executar o projeto sem docker compose:
Esse passo a passo é para caso você deseje executar o projeto sem usar o docker compose. Para isso, comente o database configurado com o postgres e descomente o database que usa o sqlite. Por padrão o projeto está configurado com o Postgres.
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
Nesse caso só será necessário a SECRET_KEY. Copie e cole a variável SECRET_KEY que está em .env.example para o seu .env. Em seguida, no seu terminal execute o seguinte comando para criar:

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
pytest --cov=user_app
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

- Adicione um endpoint de busca por nome de usuário com paginação.

```