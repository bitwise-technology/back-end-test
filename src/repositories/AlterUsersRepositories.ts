import { EntityRepository, Repository } from 'typeorm';

import User from '../entities/User';

@EntityRepository(User)
class AlterUsersRepositories extends Repository<User> {}

export default AlterUsersRepositories;
