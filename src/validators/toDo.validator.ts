import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const createSchema = Joi.object({
    titulo: Joi.string().required(),
    descricao: Joi.string().required(),
    status: Joi.string().valid('pendente', 'em_andamento', 'concluido', 'planejamento').required(),
});

const updateSchema = Joi.object({
    titulo: Joi.string(),
    descricao: Joi.string(),
    status: Joi.string().valid('pendente', 'em_andamento', 'concluido', 'planejamento'),
});

const idSchema = Joi.object({
    todo_id: Joi.number().integer().required(),
});

export const validateCreateToDo = (req: Request, res: Response, next: NextFunction) => {
    const { error } = createSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

export const validateUpdateToDo = (req: Request, res: Response, next: NextFunction) => {
    const { error } = updateSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

export const validateIdParam = (req: Request, res: Response, next: NextFunction) => {
    const { error } = idSchema.validate(req.params);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};
