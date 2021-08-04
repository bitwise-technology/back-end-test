## Desafio backend - Bitwise Tecnology

Implementação do [desafio](DESAFIO.md) da Bitwise Tecnology com uso de RESTful API.

## Como usar

1. Tenha o ecossistema do [Docker](https://docs.docker.com/engine/install/) instalado, incluindo o [docker-compose](https://docs.docker.com/compose/install/).
2. Faça o download do repositório.
3. Crie um arquivo `.env` na raiz do repositório, contendo o [oauth token](https://docs.github.com/pt/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) do github que o client irá usar para se comunicar com a [API GraphQL do Github](https://docs.github.com/pt/graphql/overview/about-the-graphql-api), de acordo com o formato abaixo.

   `.env`

   ```env
   GITHUB_TOKEN=yourtokenhere
   ```

    >Obs.: também é possível definir uma variavel de ambiente `GITHUB_TOKEN` no seu `.bashrc`. De qualquer forma, o sistema irá procurar por uma variável de ambiente `GITHUB_TOKEN` ao iniciar. Sem um token válido, o sistema não poderá se comunicar com a API do Github.

4. Execute `docker-compose up` na raiz do projeto.
5. Agora basta aguardar a criação e execução das imagens.
6. Quando aparecer a mensagem:

   ```terminal
   Server started, listening at port 5000...
   ```

   significa que a API já está funcionando, basta ir até [localhost:5000](http://localhost:5000) para verificar o resultado!

   - Se quiser testar todas as requisições possíveis usando o [Postman](https://www.postman.com/downloads/), as requisições e ambiente foram exportados para `/postman-requests`

   - O código é executado usando o [nodemon](https://www.npmjs.com/package/nodemon), o que significa que você pode fazer alterações no código em `/src` e ver o resultado em tempo real!
