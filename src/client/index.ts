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
      avatarUrl
      bio
      email
      name
      login
    }
  }
`;
// Query de consulta das informações de usuário por email
const queryUserEmail = gql`
  query getUser($email: String!) {
    user(email: $email) {
      avatarUrl
      bio
      email
      name
      login
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

/**
 * Busca de usuário por email
 * @param email Email do usuário
 * @returns usuário encontrado, ou null caso não exista usuário com este email
 */
async function getUserByEmail(email: string) {
  try {
    const data = await client.request<GithubUser>(queryUserEmail, {
      email: email
    });

    return data;
  } catch (e) {
    return null;
  }
}

export { getUser, getUserByEmail };
