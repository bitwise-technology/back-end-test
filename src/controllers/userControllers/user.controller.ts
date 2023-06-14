import { Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';
import { UserUseCase } from '../../usecases/usersUseCase/userUseCase';
import { CreateUserDto, UpdateUserDto } from '../../models/user.model';
import { StatusCodes } from 'http-status-codes';
import gitHubApi from '../../services/gitHubApi';

// Create a new instance of the Prisma client
const prisma = new PrismaClient();

// Define a class for the user controller
export class UserController {
  // Create a private instance of the UserUseCase class
  private readonly userUseCase: UserUseCase;

  // Define a regex pattern for email validation
  private EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

  // Initialize the userUseCase instance in the constructor
  constructor() {
    this.userUseCase = new UserUseCase();
  }

  // Create a new user
  public async createUser(req: Request, res: Response) {
    // Extract the user data from the request body
    const userData: CreateUserDto = req.body;

    // Define the validation rules for required fields
    const validationRules = [
      { field: 'username', required: true },
      { field: 'name', required: true },
      { field: 'email', required: true },
    ];

    // Check the required fields
    for (const rule of validationRules) {
      const { field, required } = rule;
      const value = (userData as Record<string, any>)[field];

      if (required && !value) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: `Missing required field: ${field}`,
        });
      }
    }

    // Check if user already exists
    const existingUsername = await prisma.user.findUnique({
      where: { username: userData.username },
    });

    const existingEmail = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUsername || existingEmail) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'User already exists!' });
    }

    if (
      userData.gender !== 'Male' &&
      userData.gender !== 'Female' &&
      userData.gender !== undefined
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Not a valid gender' });
    }

    if (!this.EMAIL_PATTERN.test(userData.email)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid email address',
      });
    }

    try {
      const user: User = await this.userUseCase.create(userData);
      res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'An error occurred while creating the user',
      });
    }
  }

  // Create a new user using their GitHub username
  public async createGitHubUser(req: Request, res: Response) {
    // Extract the GitHub username from the request body
    const { username } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username: username },
    });

    if (existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'User already exists!' });
    }

    // Get user data from the GitHub API
    try {
      const response = await gitHubApi.get(`/${username}`);

      const { data } = response;

      const user: User = await this.userUseCase.create({
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

  // Update an existing user
  public async updateUser(req: Request, res: Response) {
    // Extract the username from the request parameters
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

    if (
      updateUserData.gender !== 'Male' &&
      updateUserData.gender !== 'Female' &&
      updateUserData.gender !== undefined
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Not a valid gender' });
    }

    if (!this.EMAIL_PATTERN.test(updateUserData.email)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid email address',
      });
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

      // Check if email address is already associated with another account
      if (conflictingUser && updateUserData.email !== user.email) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: 'Email address already associated with another account.',
        });
      }

      const updatedUser = await this.userUseCase.update(
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

  // Find a user with their username
  public async findUser(req: Request, res: Response) {
    // Extract username from the request parameters
    const { username } = req.params;

    interface UserWithGitHubData extends User {
      followers: number;
      following: number;
      public_repos: number;
      public_url_user: string;
    }

    try {
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'User not found' });
      }

      let userData: UserWithGitHubData = { ...user } as UserWithGitHubData;

      try {
        const response = await gitHubApi.get(`/${username}`);
        const { data } = response;

        userData = {
          ...user,
          followers: data.followers,
          following: data.following,
          public_repos: data.public_repos,
          public_url_user: data.html_url,
        };
      } catch (error) {
        console.warn(`GitHub user ${username} not found`);
      }

      return res.status(StatusCodes.OK).json(userData);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error.' });
    }
  }

  public async listUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      res.status(StatusCodes.OK).json(users);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'An error occurred while retrieving the users',
      });
    }
  }
}
