import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send('Token não fornecido');
    }

    const token = authHeader.split(' ')[1];

    try {
        const user = verifyToken(token);

        Object.assign(req, { user });

        next();
    } catch (error) {
        res.status(401).send('Token inválido');
    }
}
