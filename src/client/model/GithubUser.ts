/**
 * Interface de dados da API do github
 * 
 * FIXME github NÃO contém informações de gênero!
 * portanto não é possível recuperar o gênero de um usuário
 * do github
 */

type GraphQLList = { totalCount: number }
export default interface GithubUser {
  url: string;

  avatarUrl: string;

  bio: string;

  email: string;

  name: string;

  login: string;

  followers: GraphQLList;

  following: GraphQLList;

  repositories: GraphQLList;
}
