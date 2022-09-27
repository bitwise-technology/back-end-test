# Desafio técnico Back-end

O desafio consiste na criação de uma api CRUD utilizando Python e consumir a API do [Github](https://docs.github.com/en/rest). Desafio técnico seguindo os requisitos funcionais descritos a seguir.

**Requisitos funcionais**
- Realizar cadastro do usuário
  - Endpoint para realizar o cadastro do usuário com as informações da entidade abaixo. (Obs: esse endpoint irá criar o usuário no banco de dados sem ter integração com o github)
- Realizar cadastro do usuário usando as informaçoes disponiveis no Github
  - Endpoint pelo qual o usuário possa criar uma conta passando somente o username do github
  - Se username for valido, cadastrar o usuário com as informaçoes do Github
  - Se username não for encontrado, retornar uma lista de sugestoes de nomes de usuário.
- Realizar update das informaçoes do usuário
  - Endpoint para atualizar as informaçoes do usuário  
- Consultar informaçoes de um determinado usúario por email ou username
  - Endpoint para consultar as informaçoes cadastradas no bando de dados
  - Ao consultar o perfil do usuário cadastrado, realizar consulta na api do Github e adicionar as seguinte informações caso o usuário possua uma conta: Quantidade de Followers, Quantidade de Following, Quantidade de repositorios publicos, URL publica para o profile desse usuário no Github. 

```
Definição da Entidade: 

- username
  - Unico na base de dados
  - Entre 5 a 30 caracteres
  - Alfanumérico

- name
  - Obrigatório
  - Entre 3 a 30 caracteres 
  - Apenas letras

- lastName
  - Opcional
  - Entre 3 a 30 caracteres 
  - Apenas letras

- profileImageUrl
  - Opcional
  - URL

- bio
  - Opcional
  - Entre 3 a 30 caracteres 
  - Apenas letras
  
- email
  - Unico na base de dados
  - Usar validação de email padrão
  
- gender
  - Opcional
  - Na base de dados irá existir 3 tipos de gêneros: Male, Female e Not Specified ( no caso do usuário enviar NULL )
  
As exceções para as regras de cada campo devem ser tratadas e enviadas para o usuário com suas respectivas mensagens de erros e código de status. 
Ex: 
  - Se caso o usuário esquecer de enviar um campo obrigatório:  Response status: 400 bad request, Response Message: Missing required field: <filed name>
```

**Executar o projeto**

* Configurar o banco de dados em `core/configs.py`, usuário, senha e nome do banco;
* No diretório do projeto, `python3 create_tables.py` para criar a tabela no banco;
* No diretório do projeto, `python3 main.py` para iniciar o servidor e executar o projeto.
