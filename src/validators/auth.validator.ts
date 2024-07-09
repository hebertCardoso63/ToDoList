import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const authSchema = Joi.object({
    nome_usuario: Joi.string().required(),
    senha: Joi.string().required(),
});

export const validateAuth = (req: Request, res: Response, next: NextFunction) => {
    const { error } = authSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};
