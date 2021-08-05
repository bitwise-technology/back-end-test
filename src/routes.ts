import { Router } from 'express';

import CreateUserController from './controllers/CreateUserController';
import CreateUserGithubController from './controllers/CreateUserGithubController';
import ListUserController from './controllers/ListUserController';
import AlterUserController from './controllers/AlterUserController';

const router = Router();

const createUserController = new CreateUserController();
const createUserGithubController = new CreateUserGithubController();

const listUserController = new ListUserController();

const alterUserController = new AlterUserController();

router.post('/users', createUserController.handle);
router.post('/githubusers', createUserGithubController.handle);
router.get('/user', listUserController.handle);
router.post('/updateuser', alterUserController.handle);

export { router };
