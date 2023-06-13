import { Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';
import { UserUseCase } from '../../usecases/usersUseCase/userUseCase';
import { CreateUserDto } from '../../models/user.model';
import { StatusCodes } from 'http-status-codes';

export const Prisma = new PrismaClient();

export class UserController {
  private readonly userUseCase: UserUseCase;

  constructor() {
    this.userUseCase = new UserUseCase();
  }

  public createUser = async (req: Request, res: Response) => {
    const createUserDto: CreateUserDto = req.body;

    const validationRules = [
      { field: 'username', required: true },
      { field: 'name', required: true },
      { field: 'email', required: true },
    ];

    for (const rule of validationRules) {
      const { field, required } = rule;
      const value = (createUserDto as Record<string, any>)[field];

      if (required && !value) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: `Missing required field: ${field}`,
        });
      }
    }

    try {
      const existingUser = await Prisma.user.findUnique({
        where: { username: createUserDto.username },
      });

      if (existingUser) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: 'User already exists!' });
      }

      const user: User = await this.userUseCase.createUser(createUserDto);
      res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'An error occurred while creating the user',
      });
    }
  };
}