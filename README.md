<h1>BitWise - Desafio Backend</h1>

<p align="center">
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"/>
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"/>
</p>

- [📖 Documentação](#-documentacao)
- [📑 Sobre o projeto](#-sobre)
- [📥 Gerenciador de pacotes](#-pacotes)
- [📑 Estrutura do projeto](#📑-estrutura-do-projeto)
- [🚀 Começando](#-comecando)

## 📖 Documentação

- [[Project] - Diagrama de classes](./DOCS/diagram.png)

- [[Project] - Diagrama de relação de entidades](./DOCS/ERD.png)

- [[Project] - Coleção da API para imsomnia](./DOCS/Insomnia_2023-06-13.json)

## 📑 Sobre

Código desenvolvido para o desafio Back End da BitWise
O código foi desenvolvido utilizando TypeScript e node, para a comunicação foi utilizado Express, para acesso e manipulação de banco de dados foi utilizado Prisma e para documentação foi utilizado Prisma ERD.
O projeto apresenta todos os endpoint requisitados, além de algumas adições que acreditei que agregariam positivamente.

# 📥 Pacotes

O projeto foi desenvolvido utilizando NPM, mas você pode utilizar qualquer um dos gerenciadores abaixo:

- Yarn
- PNPM
- NPM

# 📑 Estrutura do projeto
O diretorio src é dividido da seguinte maneira:
```
├── controllers
│   └── userControllers
│       └── user.controller.ts
├── models
│   └── user.model.ts
├── routes
│   ├── index.ts
│   └── user.routes.ts
├── server.ts
├── services
│   └── gitHubApi.ts
└── usecases
    └── usersUseCase
        └── userUseCase.ts
```

## 🚀 Comecando

### Passo 1:

> Ao clonar o projeto execute o comando **npm install** no terminal para instalar as dependências.

### Passo 2:

> Crie o arquivo **.env** na raiz do projeto para fazer a conexão com o banco de dados.

### Passo 3:

> Para conectar com o banco de dados escreva a linha encontrada como exemplo no arquivo **.env.local.example**

### Passo 4:

> Execute o docker com o comando **docker-compose up -d**

### Passo 5:

> Ative o servidor node com: **npm run start**. Isto fara com que sua aplicação.
