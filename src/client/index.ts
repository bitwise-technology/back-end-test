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

// função assíncrona de acesso à API do github
async function getUser(username: string) {
  try {
    const data = await client.request<GithubUser>(queryUser, {
      login: username
    });

    return data;
  } catch (e) {
    return null;
  }
}

export default getUser;
