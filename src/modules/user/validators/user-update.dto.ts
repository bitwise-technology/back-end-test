import { IsNotEmpty, IsNumber } from 'class-validator';

import { UserDTO } from './user.dto';

/**
 * Classe base para valiação de input para fazer o update do usuário
 */
export class UserUpdateDTO extends UserDTO {
  @IsNumber({ allowInfinity: false }, { message: 'ID must be a interger.' })
  @IsNotEmpty({ message: 'ID is required.' })
  id: number;
}
