import {
  Get,
  Put,
  Res,
  Post,
  Body,
  Query,
  Param,
  UsePipes,
  HttpStatus,
  Controller,
  ParseIntPipe,
  HttpException,
  ValidationPipe
} from '@nestjs/common';

import { Response } from 'express';
import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

import { User } from '../../model';
import { UserService } from '../../providers';
import { GithubApiService } from '../../providers/github-api/github-api.service';
import { UserUpdateDTO, UserDTO, GithubRegisterDTO } from '../../validators';

export interface DefaultResponse {
  users?: User[];
  user?: User;
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
  public listAllUsers(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number
  ): Observable<DefaultResponse> {
    const promise = this.userService.findAll(limit, offset);
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

  /**
   * Faz o cadastro do usuário com o username do github
   * @param data body da requisição
   * @param response response que será retornado ao cliente
   */
  @Post('register/github')
  @UsePipes(new ValidationPipe({ transform: true }))
  public inserWithUsernameGithub(
    @Body() data: GithubRegisterDTO,
    @Res() response: Response
  ) {
    const { username } = data;

    return this.githubApiService.getUserInfo(username).pipe(
      mergeMap(gitHubUser => {
        if (!gitHubUser) {
          return this.githubApiService.getUsersByQuery(username).pipe(
            map(availableUsers => ({
              message: 'User not found on github',
              code: HttpStatus.NOT_FOUND,
              availableUsers
            })),
            tap(result =>
              response
                .status(HttpStatus.NOT_FOUND)
                .json(result)
                .send()
            )
          );
        }
        const user = UserDTO.assignGithubUser(gitHubUser);
        return this.inserNewUser(user).pipe(
          tap(result =>
            response
              .status(HttpStatus.CREATED)
              .json(result)
              .send()
          )
        );
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
        console.log(response);
        if (response.user) return response;

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
        if (response.user) return response;

        throw new HttpException(
          { message: 'User NOT Found' },
          HttpStatus.NOT_FOUND
        );
      })
    );
  }

  /**
   * Recupera as informações do usuário
   * @param id identificador do usuário
   */
  @Get('/:id/profile')
  public getUserProfile(@Param('id', ParseIntPipe) id: string | number) {
    return this.userService.findOne(id).pipe(
      mergeMap(user => {
        if (!user)
          throw new HttpException(
            { message: 'User not found' },
            HttpStatus.NOT_FOUND
          );

        return this.mapToResponse(
          this.githubApiService.getUserMetrics(user.githubLogin).pipe(
            map(userMetrics => ({
              ...user,
              githubMetrics: userMetrics || undefined
            }))
          )
        );
      })
    );
  }

  @Get('search/:nome')
  public getUsersByUsername(
    @Param('nome') nome: string,
    @Query('limit', ParseIntPipe) limit?: number,
    @Query('offset', ParseIntPipe) offset?: number
  ) {
    return this.userService.findUsersWithSimilarName(nome, limit, offset);
  }

  /**
   * Cria um endpoint comum para as respostas do
   * @param value valor a ser usado no endpoint
   */
  protected mapToResponse(value: Observable<User | User[]>) {
    return value.pipe(
      map(response => {
        if (Array.isArray(response)) return { users: response };

        return { user: response };
      })
    );
  }
}
