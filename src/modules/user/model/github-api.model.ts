export interface GithubUser {
  name: string;
  avatarUrl: string;
  email: string;
  bio: string;
  login: string;
}

export interface GithubUserMetrics {
  /**
   * Quantidade total de usuários seguidos
   */
  totalFollowing: number;
  /**
   * Quantidade total de seguidores
   */
  totalFollowers: number;
  /**
   * Quantidade total de repositórios publicos
   */
  totalPublicRepositories: number;
  /**
   * Url de acesso ao github
   */
  profileUrl: string;
}

export interface SeachUserByString {
  nodes: GithubUser[];
}

/**
 * resposta do github para a query de pegar informações
 * métricas sobre o usuário
 */
export interface GithubResponseUserMetrics {
  repositories: {
    totalCount: number;
  };
  followers: {
    totalCount: number;
  };
  following: {
    totalCount: number;
  };

  url: string;
}

export interface GraphqlPayload<T> {
  [key: string]: T;
}

export interface GraphqlResponse<T = any> {
  data: GraphqlPayload<T>;
}
