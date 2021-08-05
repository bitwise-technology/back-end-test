import { getCustomRepository } from 'typeorm';

import {
  verifyUsername,
  verifyEmail,
  verifyUrl,
  verifyField,
} from '../utils/regex';
import UsersRepositories from '../repositories/UsersRepositories';
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

    if (!username) {
      throw new Error('Missing required field: username');
    } else if (!verifyUsername(username)) {
      throw new Error('Invalid username');
    }

    const userAlreadyExists = await usersRepository.findOne({
      username,
    });
    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    if (!name) {
      throw new Error('Missing required field: name');
    } else if (!verifyField(name)) {
      throw new Error('Invalid name');
    }

    if (lastName) {
      if (!verifyField(lastName)) {
        throw new Error('Invalid last name');
      }
    }

    if (profileImageUrl) {
      if (!verifyUrl(profileImageUrl)) {
        throw new Error('Invalid profile image url');
      }
    }

    if (bio) {
      if (!verifyField(bio)) {
        throw new Error('Invalid bio');
      }
    }

    if (!email) {
      throw new Error('Missing required field: email');
    } else if (!verifyEmail(email)) {
      throw new Error('Invalid email');
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
