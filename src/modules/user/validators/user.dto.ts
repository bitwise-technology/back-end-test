import {
  IsAlphanumeric,
  IsAlpha,
  IsEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsUrl,
  IsOptional,
  IsEmail,
  IsEnum
} from 'class-validator';

import { GithubUser, USER_GENDER } from '../model';

/**
 * Classe de validação de usuário para inserir
 * sequindo os modelos repassados
 */
export class UserDTO {
  @IsEmpty({
    message: 'This value is generated'
  })
  id: number;

  @IsString({
    message: 'The username must be a string.'
  })
  @MinLength(5, { message: 'Username must contain at least 5 characters' })
  @MaxLength(30, {
    message: 'Username must contain a maximum of 30 characters'
  })
  @IsAlphanumeric(undefined, {
    message: 'Username must be a alphanumeric value'
  })
  username: string;

  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name must contain at least 3 characters' })
  @MaxLength(30, {
    message: 'Name must contain a maximum of 30 characters'
  })
  @IsAlpha(undefined, { message: 'Name must contain only letters ' })
  name: string;

  @IsString({ message: 'Lastname must be a string' })
  @MinLength(3, { message: 'Lastname must contain at least 3 characters' })
  @MaxLength(30, {
    message: 'Lastname must contain a maximum of 30 characters'
  })
  @IsAlpha(undefined, { message: 'Lastname must contain only letters ' })
  @IsOptional()
  lastName: string;

  @IsUrl({}, { message: 'ProfileImageUrl must be an url' })
  @IsOptional()
  profileImageUrl: string;

  @MinLength(3, { message: 'Bio must contain at least 3 characters' })
  @MaxLength(30, {
    message: 'Bio must contain a maximum of 30 characters'
  })
  @IsOptional()
  bio: string;

  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string;

  @IsEnum(USER_GENDER, {
    message: `Use a defined gender value: ${USER_GENDER.FEMALE} or ${USER_GENDER.MALE} `
  })
  @IsOptional()
  gender: USER_GENDER;

  /**
   * Retorna uma entidade de UserDto mapeado apartir dos valores recuperados
   * da api do github
   * @param values valores recuperados do github
   */
  static assignGithubUser(values: GithubUser): UserDTO {
    const user = new UserDTO();
    user.name = values.name;
    user.username = values.login;
    user.profileImageUrl = values.avatarUrl;
    user.email = values.email;
    user.bio = values.bio;
    return user;
  }
}
