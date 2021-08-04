import { GraphQLClient, gql } from 'graphql-request';

import githubApi from './github-api.json';
import GithubUser from './model/GithubUser';

// cliente usado para fazer requisições HTTP
const client = new GraphQLClient(githubApi.uri, {
  headers: {
    Authorization: `bearer ${process.env.GITHUB_TOKEN}`
  }
});

// Query de consulta das informações de usuário
const queryUser = gql`
  query getUser($login: String!) {
    user(login: $login) {
      url
      avatarUrl
      email
      bio
      name
      login
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories {
        totalCount
      }
    }
  }
`;

/**
 * Busca de usuário por username
 * @param email username do usuário
 * @returns usuário encontrado, ou null caso não exista usuário com este username
 */
async function getUser(username: string): Promise<GithubUser | null> {
  try {
    const data = await client.request(queryUser, {
      login: username
    });

    return data.user;
  } catch (e) {
    return null;
  }
}

export { getUser };
