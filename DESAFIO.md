# Bem-vindo a Bitwise - Desafio Backend

Somos Humanos e amamos trabalhar com pessoas humanas, pode parecer estranha essa frase, mas pense bem nas empresas que você já trabalhou e em algum momento você foi tratado como um robô ou pior como recurso, aqui sabemos que nossos **'wisers'** são a nossa assinatura, cultura e o motivo pelo qual nossa empresa existe.

Nosso modelo de negócios combina projetos de valor compartilhado com consultoria nas tecnologias mais avançadas. Esse desafio é uma oportunidade para fazer parte do nosso time em uma jornada de aprendizado e desenvolvimento!

## Que tipo de pessoas buscamos?

Buscamos pessoas que gostem de aprender, que não tenham medo de falhar e que não fiquem presas em paradigmas de programação, pois acreditamos que linguagens, frameworks o SDK's precisam ser escolhidas baseadas na necessidade de cada projeto. E o que isso quer dizer? Simples, quer dizer que nós amamos trabalhar com tecnologias de ponta e quem decidirá as ferramentas a serem utilizadas assim como a composição tecnológica será o time envolvido.

## Instruções para participar

- Crie sua conta no github, caso você não tenha uma
- Crie um novo fork do repositório do desafio
- Crie uma nova branch com seu nome-sobrenome
- Faça um pull request para o nosso repositório quando você terminar o desafio.
- Envie um email para douglas@bitwise.ltda para te adicionarmos ao time slack do desafio.
- Adicione no README.md como devemos realizar o setup do servidor ou crie um script setup.sh para rodarmos e subirmos o ambiente local host.
- Adicione um arquivo com todas as chamadas para seus endpoints, com CURL ou usando o Postman.

## O nosso desafio

Como você irá ver, nós somos fãs do Github e nada mais justo que fazer um desafio baseado nessa API sensacional! 

Basicamente você tem a responsabilidade de criar uma Restful API usando a [API de GraphQL do Github](https://docs.github.com/en/graphql) que tenha as seguintes features:

- Realizar cadastro do usuário
  - Crie um ou mais endpoits para realizar o cadastro do usuário com as informações da entidade abaixo
- Realizar cadastro do usuário usando as informaçoes disponiveis no Github
  - Crie um enpoint pelo qual o usuário possa criar uma conta passando somente o username do github
  - Se username for valido, cadastrar o usuário com as informaçoes do Github ( Os dados devem ser mapeados da API do Github para sua API )
  - Se username não for encontrado, retornar uma lista de sugestoes de nomes de usuário.
- Realizar update das informaçoes do usuário
  - Crie um ou mais endpoints para atualizar as informaçoes do usuário  
- Consultar informaçoes de um determinado usúario por email ou username
  - Crie um ou mais endpoints para consultar as informaçoes cadastradas
  - Ao consultar o perfil do usuário cadastrado, realizar consulta no api do github e adicionar as seguinte informações caso o usuário possua uma conta: Quantidade de Followers, Quantidade de Following, Quantidade de repositorios publicos, URL publica para o profile desse usuário no Github.

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
  - Se caso o usuário esquecer de enviar um campo obrigatório:  Response status: 400 bad request, Response Message: Missing required field: username
```

Você pode usar qualquer tipo de tecnologia para entregar o projeto como: NodeJS, Ruby on Rails, MongoDB e etc.. Não existe limites ou formas erradas de fazer o projeto. Assim como o modelo e o desafio que passamos é totalmente passivo de modificação pelo desafiante, ou seja, nós inserimos somente a informaçoes basicas sinta-se livre em alterar a entidade com outras informaçoes que você acha pertinente ou obrigatoria para o seu CRUD.


OBS: *É muito importante para analisarmos sua capacidade de adaptação a novas tecnologias que o projeto seja implementado utilizando a integração  pela **API de GraphQL do Github**, mas se caso você encontre muitos problemas para entender ou implementar o GraphQL, como fallback você pode utilizar a versão **REST** , mas lembre-se, que ao fazer isso você irá perder uma grande quantidade pontos no nosso teste.*


### Adicionais

Caso você consiga completar todas tarefas acima e queira nós mostrar que você manja:
- Adicione um enpoint de busca por nome de usuário com paginação


## O que iremos avaliar?

- Adaptação a novos tipos de tecnologias como API de GraphQL do Github
- Coesão das mensagens dos commits
- Testes automatizados como (Unit Test, UI Test ...)
- Estrutura do projeto
- Nomenclatura de classes, funções e métodos
- Conhecimento em CI/CD
- Aplicação de Design Patterns
- Documentaçao da API com ferramentas como Swagger/OpenAPI/...
