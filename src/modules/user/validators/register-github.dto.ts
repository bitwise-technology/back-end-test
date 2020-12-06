import { IsString } from 'class-validator';

/**
 * Método validador para chegar valores quando é inserido
 * um usuário via o username do github
 */
export class GithubRegisterDTO {
  @IsString()
  username: string;
}
