import { Router } from 'express';
import obterTodoList from './toDoList.route';
import { authenticate } from '../middlewares/auth.middleware';
import auth from './auth.route';

const router = Router();

router
    .use(
        '/auth',
        auth,
    )
    .use(
        '/api',
        authenticate,
        obterTodoList,
    );

export default router;
