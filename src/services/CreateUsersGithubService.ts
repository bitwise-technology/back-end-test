import { getCustomRepository } from 'typeorm';
import { buildSchema, graphql } from 'graphql';

import GithubUsersRepositories from '../repositories/GithubUsersRepositories';
import User from '../entities/User';

interface IGithubUserRequest {
  username: string;
}

class CreateUsersGithubService {
  async execute({ username }: IGithubUserRequest): Promise<any> {
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

    const schema = buildSchema(`query {
      user(login: "${username}") {
        id
        login
        name
        avatarUrl
        bio
        email
      }
    }`);

    const result = await graphql(schema, '{ username }');

    return result;
  }
}

export default CreateUsersGithubService;
