import { getCustomRepository } from 'typeorm';

import { verifyEmail, verifyUrl, verifyField } from '../utils/regex';
import User from '../entities/User';
import UsersRepositories from '../repositories/UsersRepositories';

interface IAlterUserService {
  username: string;
  newName?: string;
  newLastName?: string;
  newProfileImageUrl?: string;
  newBio?: string;
  newEmail?: string;
  newGender?: string;
}

class AlterUserService {
  async execute({
    username,
    newName,
    newLastName,
    newProfileImageUrl,
    newBio,
    newEmail,
    newGender,
  }: IAlterUserService): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepositories);
    const user = await usersRepository.findOne({ username });

    if (user) {
      let { name, lastName, profileImageUrl, bio, email, gender } = user;

      if (newName) {
        if (!verifyField(newName)) {
          throw new Error('Invalid name');
        }
        name = newName;
      }
      if (newLastName) {
        if (!verifyField(newLastName)) {
          throw new Error('Invalid last name');
        }
        lastName = newLastName;
      }
      if (newProfileImageUrl) {
        if (!verifyUrl(newProfileImageUrl)) {
          throw new Error('Invalid profile image url');
        }
        profileImageUrl = newProfileImageUrl;
      }
      if (newBio) {
        if (!verifyField(newBio)) {
          throw new Error('Invalid bio');
        }
        bio = newBio;
      }
      if (newEmail) {
        const emailAlreadyExists = await usersRepository.findOne({
          email: newEmail,
        });
        if (emailAlreadyExists) {
          throw new Error('Email already exists');
        }

        if (!verifyEmail(newEmail)) {
          throw new Error('Invalid email');
        }

        email = newEmail;
      }
      if (newGender) {
        gender = newGender;
      }

      const userUpdate = usersRepository.create({
        username,
        name,
        lastName,
        profileImageUrl,
        bio,
        email,
        gender,
      });

      await usersRepository.save(userUpdate);

      return userUpdate;
    }
    throw new Error('User not found');
  }
}

export default AlterUserService;
