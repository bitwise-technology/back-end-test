# CRUD Restful API de usuários 

<h1 align="center">
  <br />
  <a href="https://www.linkedin.com/in/matheus-teodoro-7bb92818a/">
  </a>
</h1>
<p align="center">
  <a href="#page_facing_up-descrição">Descrição</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#clipboard-Funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#closed_book-instalação">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#man-Autor">Autor</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

## :page_facing_up: Descrição

Projeto feito para a candidatura para a vaga de Desenvolvedor Backend na Bitwise e que consiste de um CRUD de usuários integrando algumas funcionalidades existentes na API <a href="https://docs.github.com/en/rest?apiVersion=2022-11-28">Github</a>

## 🛠 Tecnologias

### App

- [Typescript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Ts Node Dev](https://www.npmjs.com/package/ts-node-dev)
- [Express](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [Zod](https://zod.dev/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Nodemon](https://github.com/remy/nodemon#nodemon)
- [Swagger](https://swagger.io/docs/)

### Banco de Dados

- [PostgreSQL](https://www.postgresql.org/docs/)

## :clipboard: Funcionalidades

- Cadastro de Usuário Comum
- Cadastro de Usuário com o Github
- Atualização dos dados do Usuário
- Consultar informações do Usuário pelo Username
- Consultar informações do Usuário pelo E-mail
- Exclusão de um Usuário
- Lista de Usernames de Usuários com paginação

## :closed_book: Instalação

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### Iniciando Back-End

- Abra o VSCode na sua pasta de preferência
######
- Com o terminal aberto, faça o clone deste repositório;
`$ git clone https://github.com/lanziotti/back-end-test.git`
######
- Navegue até a pasta onde esta o app;
`$ cd back-end-test`
######
- Instale as dependências;
`$ yarn ou npm install`
######
- Na pasta raíz do projeto, crie um arquivo `.env` usando como base o arquivo já existente `.env.example` e preencha os valores das variáveis sem haver nenhum espaço entre os caracteres. Exemplo:

```
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=123456
DB_NAME=desafio_backend_bitwise
````
OBS: As variáveis que começam com "DB_" são referentes ao banco de dados. Portanto, antes desse processo, o banco de dados já deve estar criado. Para isso, pose-se usar um Gerenciador de Banco de Dados como o [Beekeeper Studio](https://www.beekeeperstudio.io/)
######

- Execute aplicação;
`$ yarn dev ou npm run dev`
######

- O app vai está rodando na porta 3000 (de acordo com o exemplo acima) 
######

- Acesse <http://localhost:3000/api-docs> para testar os endpoints pelo Swagger

## :man: Autor
<a href="https://github.com/lanziotti/">
 <br />
 <sub><b>Rodrigo Lanziotti (Github)</b></sub>
</a>
<a href="https://www.linkedin.com/in/rodrigo-lanziotti-16a64966/">
 <br />
 <sub><b>Rodrigo Lanziotti (LinkedIn)</b></sub>
</a>

######

Feito por Rodrigo Lanziotti :wave::wave: Entre em contato sempre que quiser!🚀


