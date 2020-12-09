# Bem vindo ao meu teste

Olá meu nome é Hitallo William e esse é o meu teste.
Meu e-mail é hitallo91@gmail.com

## Documentação da API

Para acessar a documentação clique [aqui](https://www.apimatic.io/api-docs-preview/5fcd94b5b30de534542c67c8/docs#/http/api-endpoints/misc/get-server-running)

A documentação foi feita utilizando o site apimatic.io.

## Tecnologias utilizadas

Para o desenvolvimento dessa aplicação foram usadas as seguintes tecnlogias:
- Typescript (superst javascript para trabalhar com tipagem e outras funcionalidades da orientação a objetos)
- NestJs (Framework backend baseado no Angular2+)
- Rxjs (O NestJS assim como o Angular utiliza em seu "core" o Rxjs que é uma biblioteca que utiliza conceitos da programação reatica)
- TypeOrm (Orm para Nodejs)
- Class validator (Depencia utilizada e indicada pelo nestjs para fazer as devidas validações de inpu)
- Sqlite3 (pela facilidade utilizei um simpels banco de dados)
- Jest (Lib de testes)

## Executando a API locamente

Para executar a api é nescessário que você tenha o [Node](https://https://nodejs.org/pt-br/) instalado em sua máquina junto com o [npm](https://www.npmjs.com/).

Para utilizar e comunicar a api do github é nescessário ter um token OAuth que deve ser criado apartir da conta que utilizará os recursos. Veja [aqui](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token) o passo a passo.

Depois de ter certeza que o node e o npm estão disponiveis na sua máquina e com o toke OAuth em mãos, siga o passo a passo.
1. Crie um arquivo `.env` na raiz do projeto com a sequinte estrutura, inserindo seu token.
  ```
  GITHUB_O_AUTH_TOKEN = SEU_TOKEN_GERADO_AQUI
  ```
2. No seu terminal rode `npm install` - instalará as dependencias do projeto.
3. No seu terminal rode `npm start` - irá iniciar o servidor na porta 3000 da sua máquina.

## Testes

Para executar os testes da aplicação basta executar `npm test`.
Para executar os testes com a cobertura de testes rode `npm run test:cov`.
Para execuar os testes em modo assistido rode `npm run test:watch`.
Para executar os dois ao mesmo tempo rode `npm test -- --coverage --watch`
