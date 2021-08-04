import { getCustomRepository } from 'typeorm';

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

    const regexUsername = new RegExp('^[a-zA-Z0-9_-]{5,30}$');
    const regexEmail = new RegExp('[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+');
    const regexGeneric = new RegExp('^[a-zA-Z ]{3,30}$');
    const regexUrl = new RegExp(
      'https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)',
    );

    if (!username) {
      throw new Error('Missing required field: username');
    } else if (!regexUsername.test(username)) {
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
    } else if (!regexGeneric.test(name)) {
      throw new Error('Invalid name');
    }

    if (lastName) {
      if (!regexGeneric.test(lastName)) {
        throw new Error('Invalid last name');
      }
    }

    if (profileImageUrl) {
      if (!regexUrl.test(profileImageUrl)) {
        throw new Error('Invalid profile image url');
      }
    }

    if (bio) {
      if (!regexGeneric.test(bio)) {
        throw new Error('Invalid bio');
      }
    }

    if (!email) {
      throw new Error('Missing required field: email');
    } else if (!regexEmail.test(email)) {
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
