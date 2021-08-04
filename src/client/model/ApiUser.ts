import GithubUser from './GithubUser';

/**
 * Tipo de dado de gênero
 */
export type Gender = 'm' | 'f' | undefined;

/**
 * classe da entidade Usuário usado pela API
 */
export default class ApiUser {
  profileImageUrl: string | undefined;

  bio: string | undefined;

  email: string;

  name: string;

  lastName: string | undefined;

  userName: string;

  gender: Gender;

  constructor(
    username: string,
    name: string,
    lastName: string | undefined,
    email: string,
    bio: string | undefined,
    gender: Gender
  ) {
    this.userName = username;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.bio = bio;
    this.gender = gender;
  }

  static fromGithub(user: GithubUser): ApiUser {
    const splitName = user.name.split(' ');

    return new ApiUser(
      user.userName,
      splitName[0],
      splitName[splitName.length - 1],
      user.email,
      user.bio,
      undefined
    );
  }
}
