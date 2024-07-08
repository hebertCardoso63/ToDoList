import knex from "../factories/knex.factory";
import { ToDo as ToDoModel } from "../models/todo.model";

class ToDo {
    public async obterListaTarefas(usuarioId: number): Promise<ToDoModel[]> {
        const listaAfazeres = await knex({ t: 'todos' })
            .select(['*'])
            .where('t.usuario_id', usuarioId)
            .orderBy('t.id', 'desc');

        return listaAfazeres;
    }
}

export const toDo = new ToDo();