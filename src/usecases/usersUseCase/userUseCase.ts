import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from '../../models/user.model';

export class UserUseCase {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(userData: CreateUserDto): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: userData,
    });

    return newUser;
  }

  public async update(
    userData: UpdateUserDto,
    username: string,
  ): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { username },
      data: userData,
    });

    return updatedUser;
  }
}
