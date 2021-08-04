import { EntityRepository, Repository } from 'typeorm';

import User from '../entities/User';

@EntityRepository(User)
class GithubUsersRepositories extends Repository<User> {}

export default GithubUsersRepositories;
