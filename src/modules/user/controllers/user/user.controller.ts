import {
  Get,
  Put,
  Post,
  Body,
  Param,
  UsePipes,
  HttpStatus,
  Controller,
  ParseIntPipe,
  HttpException,
  ValidationPipe
} from '@nestjs/common';

import { from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { User } from '../../model';
import { UserService } from '../../providers';
import { GithubApiService } from '../../providers/github-api/github-api.service';
import { UserUpdateDTO, UserDTO, GithubRegisterDTO } from '../../validators';

export interface DefaultResponse {
  users: User[] | User;
}

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private githubApiService: GithubApiService
  ) {}
  /**
   * Lista todos os usuários salvos
   */
  @Get()
  public listAllUsers(): Observable<DefaultResponse> {
    const promise = this.userService.findAll();
    return this.mapToResponse(promise);
  }

  /**
   * Insere um novo usuário no banco de dados
   * @param user usuario a ser inserido
   */
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  public inserNewUser(@Body() user: UserDTO) {
    const promise = this.userService.insert(user);
    return this.mapToResponse(promise);
  }

  @Post('register/github')
  @UsePipes(new ValidationPipe({ transform: true }))
  public inserWithUsernameGithub(
    @Body() data: GithubRegisterDTO
  ): Observable<DefaultResponse> {
    return this.githubApiService.getUserInfo(data.username).pipe(
      mergeMap(gitHubUser => {
        const user = UserDTO.assignGithubUser(gitHubUser);
        return this.inserNewUser(user);
      })
    );
  }

  /**
   * Faz o update das informações de usuário
   * @param id identificador pego via parametro
   * @param user novas informacoes de usuario
   */
  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  public updateUser(
    @Param('id', ParseIntPipe) id: number | string,
    @Body() user: UserUpdateDTO
  ): Observable<DefaultResponse> {
    if (user.id !== id)
      throw new HttpException(
        { message: 'ID não correspondente' },
        HttpStatus.BAD_REQUEST
      );

    const promise = this.userService.update(user);
    return this.mapToResponse(promise);
  }

  @Get('email/:email')
  public getUserByEmail(@Param('email') email: string) {
    const promise = this.userService.findByEmail(email);
    return this.mapToResponse(promise).pipe(
      map(response => {
        if (response.users) return response.users;

        throw new HttpException(
          { message: 'User NOT Found' },
          HttpStatus.NOT_FOUND
        );
      })
    );
  }

  @Get('username/:username')
  public getUserByUsername(@Param('username') username: string) {
    return this.mapToResponse(this.userService.findByUsername(username)).pipe(
      map(response => {
        if (response.users) return response.users;

        throw new HttpException(
          { message: 'User NOT Found' },
          HttpStatus.NOT_FOUND
        );
      })
    );
  }

  protected mapToResponse(value: Promise<User | User[]>) {
    return from(value).pipe(map(users => ({ users })));
  }
}
