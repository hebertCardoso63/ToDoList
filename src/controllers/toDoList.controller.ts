import { Request, Response, NextFunction } from "express";
import { toDo as toDoService } from "../services/toDo.service";
import { ToDo, CriarToDo } from "../models/todo.model";

class ToDoList {
    constructor() {
        this.listaTarefas = this.listaTarefas.bind(this);
        this.cadastrarToDo = this.cadastrarToDo.bind(this);
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

    public async cadastrarToDo(req: Request, res: Response, next: NextFunction) {
        if (!req.usuario) return res.status(401).json({ message: "Unauthorized" });

        const usuario = req.usuario;

        const dadosToDo: CriarToDo = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            status: req.body.status,
            usuario_id: usuario.id,
        };

        try {
            const idRegistro = await toDoService.criarToDo(dadosToDo);

            return res.status(201).json({ message: 'ToDo criado com sucesso.', id_registro: idRegistro });
        } catch (err) {
            next(err);
        }
    }
}

export const toDoList = new ToDoList();
