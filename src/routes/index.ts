import { Router } from "express";
import { userRoutes } from './user.routes';

const routes = Router();
routes.use("/user", userRoutes);

export { routes };
