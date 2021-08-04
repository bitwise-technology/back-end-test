import { Router } from 'express';

import CreateUserController from './controllers/CreateUserController';
import CreateUserGithubController from './controllers/CreateUserGithubController';

const router = Router();

const createUserController = new CreateUserController();
const createUserGithubController = new CreateUserGithubController();

router.post('/users', createUserController.handle);
router.post('/githubusers', createUserGithubController.handle);

export { router };
