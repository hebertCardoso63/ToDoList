import { Router } from 'express';
import { toDoList } from '../controllers/toDoList.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router
    .get(
        '/buscar/todos/:todo_id',
        toDoList.buscarTodo
    )
    .get(
        '/listar/todos',
        toDoList.listarToDos
    )
    .post(
        '/cadastrar/todo',
        toDoList.cadastrarToDo
    )
    .delete(
        '/excluir/todos/:todo_id',
        toDoList.excluirToDo,
    )
    .patch(
        '/editar/todos/:todo_id',
        toDoList.editarToDo,
    );

export default router;
