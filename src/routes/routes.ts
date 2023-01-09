import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { schemaValidation } from "../middlewares/schemaValidator";
import { userSchema } from "../validations/UserSchema";

const routes = Router();

routes.post('/user', schemaValidation(userSchema), new UserController().create);
routes.post('/userGithub', new UserController().createUserGithub);
routes.put('/user/:id', schemaValidation(userSchema), new UserController().update);
routes.get('/user/username/:username', new UserController().readUsername);
routes.get('/user/email/:email', new UserController().readEmail);
routes.delete('/user/:id', new UserController().delete);
routes.get('/users', new UserController().readUsers);

export default routes;