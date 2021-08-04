/**
 * Interface de dados da API do github
 * 
 * FIXME github NÃO contém informações de gênero!
 * portanto não é possível recuperar o gênero de um usuário
 * do github
 */
export default interface GithubUser {
  avatarUrl: string;

  bio: string;

  email: string;

  name: string;

  login: string;
}
