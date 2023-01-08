import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { schemaValidation } from "../middlewares/schemaValidator";
import { userSchema } from "../validations/UserSchema";

const routes = Router();

routes.post('/user', schemaValidation(userSchema), new UserController().create);
routes.post('/userGithub', new UserController().createUserGithub);
routes.put('/user/:id', schemaValidation(userSchema), new UserController().update);
routes.get('/user/:username', new UserController().readUsername);

export default routes;