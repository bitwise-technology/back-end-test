import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from 'zod';

export const schemaValidation = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body)
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json(error.issues.map((issue) => ({ mensagem: issue.message })));
        }
        return res.status(400).json({ mensagem: "Erro interno do servidor." });
    }
}