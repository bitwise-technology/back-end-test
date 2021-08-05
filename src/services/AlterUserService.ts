import { getCustomRepository } from 'typeorm';

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
        name = newName;
      }
      if (newLastName) {
        lastName = newLastName;
      }
      if (newProfileImageUrl) {
        profileImageUrl = newProfileImageUrl;
      }
      if (newBio) {
        bio = newBio;
      }
      if (newEmail) {
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
