## Desafio backend - Bitwise Tecnology

Implementação do [desafio](DESAFIO.md) da Bitwise Tecnology para implementação de RESTful API.

## Como usar

1. Tenha o ecossistema do [Docker](https://docs.docker.com/engine/install/) instalado.
2. Instale o [docker-compose](https://docs.docker.com/compose/install/).
3. Faça o download dos repositório.
4. Crie um arquivo `.env` na raiz do repositório, contendo o [oauth token](https://docs.github.com/pt/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) do github que o client irá usar para se comunicar com a [API GraphQL do Github](https://docs.github.com/pt/graphql/overview/about-the-graphql-api), de acordo com o formato abaixo. Sem um token válido, o sistema não poderá se comunicar com a API do Github.

   `.env`

   ```env
   GITHUB_TOKEN=yourtokenhere
   ```

5. Execute `docker-compose up` na raiz do projeto.
6. Agora basta aguardar a criação e execução das imagens.
7. Quando aparecer a mensagem:

   ```terminal
   Server started, listening at port 5000...
   ```

   significa que a API já está funcionando, basta ir até [localhost:5000](http://localhost:5000) para verificar o resultado!

8. Se quiser testar todas as requisições possíveis usando o [Postman](https://www.postman.com/downloads/), as requisições e ambiente foram exportados para `/postman-requests`
