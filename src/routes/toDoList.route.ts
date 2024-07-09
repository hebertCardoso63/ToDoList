import { Router } from 'express';
import { toDoList } from '../controllers/toDoList.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router
    .get(
        '/todos/:todo_id',
        toDoList.buscarTodo
    )
    .get(
        '/lista-todo',
        toDoList.listarToDos
    )
    .post(
        '/cadastrar-todo',
        toDoList.cadastrarToDo
    )
    .patch(
        '/todos/:todo_id',
        toDoList.editarToDo,
    );

export default router;
