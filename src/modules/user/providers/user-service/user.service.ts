import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';

import { User } from '../../model';
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

  findAll(): Observable<User[]> {
    return from(this.usersRepository.find());
  }

  findOne(id: number | string): Observable<User> {
    return from(this.usersRepository.findOne(id));
  }

  update(user: UserDTO): Observable<User> {
    this.usersRepository.update(user.id, { ...user });
    return from(this.usersRepository.findOne(user.id));
  }

  public findByEmail(email: string): Observable<User> {
    return from(
      this.usersRepository.findOne({
        where: {
          email
        }
      })
    );
  }

  public findByUsername(username: string): Observable<User> {
    return from(
      this.usersRepository.findOne({
        where: {
          username
        }
      })
    );
  }
}
