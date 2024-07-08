import { Router } from 'express';
import { toDoList } from '../controllers/toDoList.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router
    .get(
        '/lista-ToDo',
        authenticate,
        toDoList.listaTarefas
    )
    .post(
        '/cadastrar-ToDo',
        authenticate,
        toDoList.cadastrarToDo
    );

export default router;
