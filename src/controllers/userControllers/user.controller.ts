import { Request, Response } from 'express';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { UserUseCase } from '../../usecases/usersUseCase/userUseCase';
import { CreateUserDto, UpdateUserDto } from '../../models/user.model';
import { StatusCodes } from 'http-status-codes';
import gitHubApi from '../../services/gitHubApi';

export const prisma = new PrismaClient();

export class UserController {
  private readonly userUseCase: UserUseCase;

  constructor() {
    this.userUseCase = new UserUseCase();
  }

  public async createUser(req: Request, res: Response) {
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
      const existingUsername = await prisma.user.findUnique({
        where: { username: createUserDto.username },
      });

      const existingEmail = await prisma.user.findUnique({
        where: { email: createUserDto.email },
      });

      if (existingUsername || existingEmail) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: 'User already exists!' });
      }

      const user: User = await this.userUseCase.createUser(createUserDto);
      res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'An error occurred while creating the user',
      });
    }
  }

  public async createGitHubUser(req: Request, res: Response) {
    const { username } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { username: username },
    });

    if (existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'User already exists!' });
    }

    try {
      const response = await gitHubApi.get(`/${username}`);

      const { data } = response;

      const user: User = await this.userUseCase.createUser({
        username: data.login,
        name: data.name ? data.name : 'User does not have name',
        email: data.email ? data.email : `${username}@emailnotfound.com`,
        profileImageUrl: data.avatar_url,
        bio: data.bio,
      });

      res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      if (error instanceof Error && error.response?.status === 404) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'User not found on GitHub.' });
      }

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'An error occurred while creating the GitHub user',
      });
    }
  }

  public async updateUser(req: Request, res: Response) {
    const { username } = req.params;
    const updateUserData = req.body;
    const validationRules = [
      { field: 'username', required: true },
      { field: 'name', required: true },
      { field: 'email', required: true },
    ];

    for (const { field, required } of validationRules) {
      const value = updateUserData[field];

      if (required && !value) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: `Missing required field: ${field}`,
        });
      }
    }

    try {
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (!user) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: 'User not found!' });
      }

      const conflictingUser = await prisma.user.findUnique({
        where: { email: updateUserData.email },
      });

      if (conflictingUser && updateUserData.email !== user.email) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({
            error: 'Email address already associated with another account.',
          });
      }

      const updatedUser = await this.userUseCase.updateUser(
        updateUserData,
        username,
      );
      res.status(StatusCodes.CREATED).json(updatedUser);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'An error occurred while updating the user',
      });
    }
  }
}
