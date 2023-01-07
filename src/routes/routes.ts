import { Request, Response, Router } from "express";

const routes = Router();

routes.post('/user', (req: Request, res: Response) => {
    return res.json("Tudo OK!");
})

export default routes;