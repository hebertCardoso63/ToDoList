import { Request, Response, NextFunction } from "express";
import { toDo as toDoService } from "../services/toDo.service";


const {
    REQUEST,
    COMMAND,
    COMPONENT,
    JWT_SECRET,
    API_VERSION,
    ACCESS_TOKEN,
} = process.env;

class ToDoList {
    constructor() {
        this.listaTarefas = this.listaTarefas.bind(this);
    }

    public async listaTarefas(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(888);
            const listaTarefas = await toDoService.obterListaTarefas();
            res.status(200).json(listaTarefas);
        } catch (err) {
            next(err);
        }
    }
}

export const toDoList = new ToDoList();
