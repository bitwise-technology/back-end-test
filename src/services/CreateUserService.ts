import { getCustomRepository } from 'typeorm';

import { UsersRepositories } from '../repositories/UsersRepositories';
import User from '../entities/User';

interface IUserRequest {
  username: string;
  name: string;
  lastName?: string;
  profileImageUrl?: string;
  bio?: string;
  email: string;
  gender?: string;
}

class CreateUserService {
  async execute({
    username,
    name,
    lastName,
    profileImageUrl,
    bio,
    email,
    gender = 'Not Specified',
  }: IUserRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepositories);

    // const regexUsername = new RegExp('^[a-z0-9_-]{5,30}$');
    // const regexEmail = new RegExp('[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+');

    if (!username) {
      throw new Error('Missing required field: username');
    }

    const userAlreadyExists = await usersRepository.findOne({
      username,
    });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    if (!name) {
      throw new Error('Missing required field: name');
    }

    if (!email) {
      throw new Error('Missing required field: email');
    }

    const emailAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (emailAlreadyExists) {
      throw new Error('Email already exists');
    }

    const user = usersRepository.create({
      username,
      name,
      lastName,
      profileImageUrl,
      bio,
      email,
      gender,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
