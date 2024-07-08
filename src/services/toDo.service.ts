import knex from "../factories/knex.factory";
import {
    ToDo as ToDoModel,
    CriarToDo,
    AtualizarToDo
 } from "../models/todo.model";

class ToDo {
    public async obterToDo(usuarioId: number, toDoId: number): Promise<ToDoModel | undefined> {
        const todo: ToDoModel = await knex({ t: 'todos' })
            .select(['*'])
            .where('t.id', toDoId)
            .where('t.usuario_id', usuarioId)
            .first();

        return todo;
    }

    public async obterListaTarefas(usuarioId: number): Promise<ToDoModel[]> {
        const listaAfazeres = await knex({ t: 'todos' })
            .select(['*'])
            .where('t.usuario_id', usuarioId)
            .orderBy('t.id', 'desc');

        return listaAfazeres;
    }

    public async criarToDo(dadosInsert: CriarToDo): Promise<number> {
        const [ idRegistro ] = await knex('todos')
            .insert(dadosInsert, ['id']);

        return idRegistro.id;
    }

    public async editarTodo(usuarioId: number, toDoId: number, dadosEdit: AtualizarToDo): Promise<number | undefined> {
        const [idRegistro] = await knex({ t: 'todos' })
            .where('t.id', toDoId)
            .where('t.usuario_id', usuarioId)
            .update(dadosEdit, ['id']);

        if (!idRegistro) return undefined;

        return idRegistro.id;
    }
}

export const toDo = new ToDo();