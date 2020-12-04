import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from '../../model';
import { UserDTO } from '../../validators/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  insert(user: UserDTO): Promise<User> {
    const createdUser = this.usersRepository.create({ ...user });
    return this.usersRepository.save(createdUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number | string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  update(user: UserDTO): Promise<User> {
    this.usersRepository.update(user.id, { ...user });
    return this.usersRepository.findOne(user.id);
  }

  public findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email
      }
    });
  }

  public findByUsername(username: string) {
    return this.usersRepository.findOne({
      where: {
        username
      }
    });
  }
}
