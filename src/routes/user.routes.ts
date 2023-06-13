import { Router } from "express";
import { UserController } from "../controllers/userControllers/user.controller";

const userController = new UserController();

const userRoutes = Router();
userRoutes.post("/", userController.createUser.bind(userController));

export {userRoutes};
