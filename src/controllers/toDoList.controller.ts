import { Request, Response, NextFunction } from "express";
import { toDo as toDoService } from "../services/toDo.service";
import { ToDo } from "../models/todo.model";

class ToDoList {
    constructor() {
        this.listaTarefas = this.listaTarefas.bind(this);
    }

    public async listaTarefas(req: Request, res: Response, next: NextFunction) {
        if (!req.usuario) return res.status(401).json({ message: "Unauthorized" });

        const usuario = req.usuario;

        try {
            const listaTarefas: ToDo[] = await toDoService.obterListaTarefas(usuario.id);

            return res.status(200).json(listaTarefas);
        } catch (err) {
            next(err);
        }
    }
}

export const toDoList = new ToDoList();
