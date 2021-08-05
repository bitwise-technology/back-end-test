import { getCustomRepository } from 'typeorm';
import User from '../entities/User';

import UsersRepositories from '../repositories/UsersRepositories';

class ListUserService {
  async execute(username: string, email: string): Promise<User | undefined> {
    if (!username && !email) {
      throw new Error('Missing required field: username or email');
    }

    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({
      where: [{ username }, { email }],
    });

    return user;
  }
}

export default ListUserService;
