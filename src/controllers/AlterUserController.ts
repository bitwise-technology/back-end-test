import { Request, Response } from 'express';

import AlterUserService from '../services/AlterUserService';

class AlterUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, name, lastName, profileImageUrl, bio, email, gender } =
      request.body;

    const createUserService = new AlterUserService();

    const user = await createUserService.execute({
      username,
      newName: name,
      newLastName: lastName,
      newProfileImageUrl: profileImageUrl,
      newBio: bio,
      newEmail: email,
      newGender: gender,
    });

    return response.json(user);
  }
}

export default AlterUserController;
