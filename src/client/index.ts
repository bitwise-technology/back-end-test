import { request, GraphQLClient, gql } from 'graphql-request';

import githubApi from './github-api.json';

const client = new GraphQLClient(githubApi.uri, {
  headers: {
    Authorization: `bearer ${githubApi.token}`
  }
});

const testQuery = gql`
  {
    user(login: "josecarlosns") {
      email
    }
  }
`;

client.request(testQuery).then(data => console.log(data));
