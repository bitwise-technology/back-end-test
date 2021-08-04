import { Router } from 'express';

import CreateUserController from './controllers/CreateUserController';
import CreateUserGithubController from './controllers/CreateUserGithubController';
import ListUserController from './controllers/ListUserController';

const router = Router();

const createUserController = new CreateUserController();
const createUserGithubController = new CreateUserGithubController();

const listUserController = new ListUserController();

router.post('/users', createUserController.handle);
router.post('/githubusers', createUserGithubController.handle);
router.get('/user', listUserController.handle);

export { router };
