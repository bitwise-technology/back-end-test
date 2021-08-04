import { getCustomRepository } from 'typeorm';
import { GraphQLClient, gql } from 'graphql-request';

import GithubUsersRepositories from '../repositories/GithubUsersRepositories';
import User from '../entities/User';

interface IGithubUserRequest {
  username: string;
}

class CreateUsersGithubService {
  async execute({ username }: IGithubUserRequest): Promise<User> {
    const githubUsersRepository = getCustomRepository(GithubUsersRepositories);

    if (!username) {
      throw new Error('Missing required field: username');
    }

    const githubUserAlreadyExists = await githubUsersRepository.findOne({
      username,
    });
    if (githubUserAlreadyExists) {
      throw new Error('User already exists');
    }

    const query = gql`
    {
      user(login: "${username}") {
        login
        name
        avatarUrl
        bio
        email
      }
    }`;

    const endpoint = 'https://api.github.com/graphql';

    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: 'Bearer TOKEN',
      },
    });

    const data = await graphQLClient.request(query);

    console.log(data);

    const [name, lastName] = data.user.name.split(' ');

    const user = githubUsersRepository.create({
      username: data.user.login,
      name,
      lastName,
      profileImageUrl: data.user.avatarUrl,
      bio: data.user.bio,
      email: data.user.email,
      gender: 'Not Specified',
    });

    await githubUsersRepository.save(user);

    return user;
  }
}

export default CreateUsersGithubService;
