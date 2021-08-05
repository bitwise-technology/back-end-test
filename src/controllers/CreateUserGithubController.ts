import { Request, Response } from 'express';

import CreateUsersGithubService from '../services/CreateUserGithubService';

class CreateUserGithubController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username } = request.body;

    const createUsersGithubService = new CreateUsersGithubService();

    const user = await createUsersGithubService.execute({ username });

    return response.json(user);
  }
}

export default CreateUserGithubController;
