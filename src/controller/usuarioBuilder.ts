import Usuario from '../model/Usuario';
import {
  emailValidationRegex,
  genderValidationRegex,
  nameValidationRegex,
  usernameValidationRegex
} from '../common/utils';

export default function buildUsuario(
  username: string,
  name: string,
  lastName: string | null,
  profileImageUrl: string | null,
  bio: string | null,
  email: string | null,
  gender: string | null
): Usuario {
  if (username != null && !username.match(usernameValidationRegex))
    throw new Error('username must be alphanumeric only and contain between 3 and 30 characters');

  if (name != null && !name.match(nameValidationRegex))
    throw new Error('name must be letters only and contain between 3 and 30 characters');

  if (lastName != null && !lastName.match(nameValidationRegex))
    throw new Error('lastName must be letters only and contain between 3 and 30 characters');

  // FIXME bio deveria conter também espaços e caracteres especiais, mas como o README do desafio pediu somente letras...
  if (bio != null && !bio.match(nameValidationRegex))
    throw new Error('bio must be letters only and contain between 3 and 30 characters');

  if (email != null && !email.match(emailValidationRegex)) throw new Error('invalid email address');

  if (gender != null && !gender.match(genderValidationRegex))
    throw new Error('gender must be either m, f or undefined');

  return new Usuario(username, name, lastName, profileImageUrl, bio, email, gender);
}
