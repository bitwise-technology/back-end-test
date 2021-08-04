import ApiUser, { Gender } from '../model/ApiUser';
import {
  bioValidationRegex,
  emailValidationRegex,
  genderValidationRegex,
  nameValidationRegex,
  usernameValidationRegex
} from '../common/utils';
import ApiError from '../model/ApiError';

/**
 * Faz validação dos dados de usuário, lança exceções caso algum dado seja inválido
 */
function checkUserData(
  username: string | null,
  name: string | null,
  lastName: string | null,
  email: string | null,
  bio: string | null,
  gender: string | null
) {
  if (username == null) {
    throw new ApiError(400, 'missing required field: username');
  } else if (!username.match(usernameValidationRegex))
    throw new ApiError(
      400,
      'username must be alphanumeric only and contain between 3 and 30 characters'
    );

  if (name == null) {
    throw new ApiError(400, 'missing required field: name');
  } else if (!name.match(nameValidationRegex))
    throw new ApiError(400, 'name must be letters only and contain between 3 and 30 characters');

  if (lastName != null && !lastName.match(nameValidationRegex))
    throw new ApiError(
      400,
      'lastName must be letters only and contain between 3 and 30 characters'
    );

  // FIXME bio deveria conter também espaços e caracteres especiais, mas como o README do desafio pediu somente letras...
  if (bio != null && !bio.match(bioValidationRegex))
    throw new ApiError(400, 'bio must be letters only and contain between 3 and 30 characters');

  if (email == null) {
    throw new ApiError(400, 'missing required field: email');
  } else if (!email.match(emailValidationRegex)) throw new ApiError(400, 'invalid email address');

  if (gender != null && !gender.match(genderValidationRegex))
    throw new ApiError(400, 'gender must be either m, f or undefined');
}

/**
 * Cria uma instância de usuário após validados os parâmetros
 *
 * @returns instância de Usuário com os dados fornecidos
 */
function buildUsuario(
  username: string,
  name: string,
  lastName: string | null,
  profileImageUrl: string | null,
  email: string,
  bio: string | null,
  gender: string | null
): ApiUser {
  checkUserData(username, name, lastName, email, bio, gender);
  return new ApiUser(username, name, lastName, profileImageUrl, email, bio, gender as Gender);
}

export { buildUsuario, checkUserData };
