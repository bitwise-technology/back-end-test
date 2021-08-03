import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, name, lastName, profileImageUrl, bio, email, gender } =
      request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      username,
      name,
      lastName,
      profileImageUrl,
      bio,
      email,
      gender,
    });

    return response.json(user);
  }
}

export default CreateUserController;
