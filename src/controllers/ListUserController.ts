import { Request, Response } from 'express';

import ListUserService from '../services/ListUserService';

class ListUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, email } = request.body;
    const listUserService = new ListUserService();

    const users = await listUserService.execute(username, email);

    return response.json({ users });
  }
}

export default ListUserController;
