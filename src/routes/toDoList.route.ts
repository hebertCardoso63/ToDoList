import { Router } from 'express';
import { toDoList } from '../controllers/toDoList.controller';
import { 
    validateCreateToDo,
    validateUpdateToDo,
    validateIdParam,
 } from '../../src/validators/toDo.validator'

const router = Router();

router
    .get(
        '/buscar/todos/:todo_id',
        validateIdParam,
        toDoList.buscarTodo
    )
    .get(
        '/listar/todos',
        toDoList.listarToDos
    )
    .post(
        '/cadastrar/todo',
        validateCreateToDo,
        toDoList.cadastrarToDo
    )
    .delete(
        '/excluir/todos/:todo_id',
        validateIdParam,
        toDoList.excluirToDo,
    )
    .patch(
        '/editar/todos/:todo_id',
        validateIdParam,
        validateUpdateToDo,
        toDoList.editarToDo,
    );

export default router;
