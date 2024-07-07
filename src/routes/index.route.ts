import { Router } from 'express';
import obterTodoList from './toDoList.route';

const router = Router();

router
    .use('', obterTodoList);

export default router;
