import knex from "../factories/knex.factory";
import {
    ToDo as ToDoModel,
    CriarToDo,
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
}

export const toDo = new ToDo();