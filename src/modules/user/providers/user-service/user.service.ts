import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { from, Observable } from 'rxjs';
import { Like, Repository } from 'typeorm';

import { User } from '../../model';
import { UserUpdateDTO } from '../../validators';
import { UserDTO } from '../../validators/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  insert(user: UserDTO): Observable<User> {
    const createdUser = this.usersRepository.create({ ...user });
    return from(this.usersRepository.save(createdUser));
  }

  /**
   * Faz a busca de usuários
   * @param limit limite de valores a serem recuperados
   * @param offset alvo da pesquisa
   */
  findAll(limit?: number, offset?: number): Observable<User[]> {
    return from(
      this.usersRepository.find({
        skip: offset,
        take: limit
      })
    );
  }

  /**
   * Faz a busca de um usuário pelo seu id
   * @param id identificador do usuario
   */
  findOne(id: number | string): Observable<User> {
    return from(this.usersRepository.findOne(id));
  }

  /**
   * Faz o update das alterações do usuário
   * @param user entidade a ser alterada
   */
  update(user: UserUpdateDTO): Observable<User> {
    this.usersRepository.update(user.id, { ...user });
    return from(this.usersRepository.findOne(user.id));
  }

  /**
   * Pesquisa o usuário pelo seu email
   * @param email email a ser pesquisado
   */
  public findByEmail(email: string): Observable<User> {
    return from(
      this.usersRepository.findOne({
        where: {
          email
        }
      })
    );
  }

  /**
   * Pesquisa um usuário pelo seu username
   * @param username username a ser pesquisado
   */
  public findByUsername(username: string): Observable<User> {
    return from(
      this.usersRepository.findOne({
        where: {
          username
        }
      })
    );
  }

  /**
   * Procusa uma lista e usuários a partir do nome repassado
   * @param nome nome a ser pesquiasdo
   * @param limit limite de usuários a serem carregados
   * @param offset alvo da pesquida
   */
  public findUsersWithSimilarName(
    nome: string,
    limit?: number,
    offset?: number
  ): Observable<User[]> {
    return from(
      this.usersRepository.find({
        where: {
          name: Like(`%${nome}%`)
        },
        take: limit,
        skip: offset
      })
    );
  }
}
