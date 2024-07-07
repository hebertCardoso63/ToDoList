import { Router } from 'express';
import { toDoList } from '../controllers/toDoList.controller';

const router = Router();

router.get('/api/lista-tarefas', toDoList.listaTarefas);

export default router;
