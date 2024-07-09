import { Router } from 'express';
import obterTodoList from './toDoList.route';
import { authenticate } from '../middlewares/auth.middleware';
import { validateAuth } from '../validators/auth.validator';

import auth from './auth.route';

const router = Router();

router
    .use('/auth', validateAuth, auth)
    .use('/api', authenticate, obterTodoList);

export default router;
