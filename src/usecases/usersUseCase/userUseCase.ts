import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from '../../models/user.model';

export class UserUseCase {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public createUser(createUser: CreateUserDto): Promise<User> {
    const newUser = this.prisma.user.create({
      data: createUser,
    });

    return newUser;
  }
}
