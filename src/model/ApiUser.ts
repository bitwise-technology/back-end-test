import GithubUser from '../client/model/GithubUser';
import { buildUsuario } from '../controller/usuarioBuilder';

/**
 * Tipo de dado de gênero
 */
export type Gender = 'm' | 'f' | null | undefined;

/**
 * classe da entidade Usuário usado pela API
 */
export default class ApiUser {
  profileImageUrl: string | null | undefined;

  bio: string | null | undefined;

  email: string;

  name: string;

  lastName: string | null | undefined;

  userName: string;

  gender: Gender;

  constructor(
    username: string,
    name: string,
    lastName: string | null | undefined,
    profileImageUrl: string | null | undefined,
    email: string,
    bio: string | null | undefined,
    gender: Gender
  ) {
    this.userName = username;
    this.name = name;
    this.lastName = lastName;
    this.profileImageUrl = profileImageUrl;
    this.email = email;
    this.bio = bio;
    this.gender = gender;
  }

  static fromGithub(user: GithubUser): ApiUser {
    const splitName = user.name.split(' ');

    return buildUsuario(
      user.login,
      splitName[0],
      splitName[splitName.length - 1],
      user.avatarUrl,
      user.email,
      user.bio,
      null
    );
  }
}
