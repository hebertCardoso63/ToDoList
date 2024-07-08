import { Router } from 'express';
import { toDoList } from '../controllers/toDoList.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router
    .get(
        '/lista-tarefas',
        authenticate,
        toDoList.listaTarefas
    );

export default router;
