import { Router } from 'express';
import { toDoList } from '../controllers/toDoList.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router
    .get(
        '/todos/:todo_id',
        authenticate,
        toDoList.buscarTodo
    )
    .get(
        '/lista-todo',
        authenticate,
        toDoList.listarToDos
    )
    .post(
        '/cadastrar-todo',
        authenticate,
        toDoList.cadastrarToDo
    )
    .patch(
        '/todos/:todo_id',
        authenticate,
        toDoList.editarToDo,
    );

export default router;
