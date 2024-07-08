import { Request, Response, NextFunction } from "express";
import { toDo as toDoService } from "../services/toDo.service";
import { ToDo, CriarToDo } from "../models/todo.model";

class ToDoList {
    constructor() {
        this.listarToDos = this.listarToDos.bind(this);
        this.cadastrarToDo = this.cadastrarToDo.bind(this);
        this.buscarTodo = this.buscarTodo.bind(this);
    }

    public async listarToDos(req: Request, res: Response, next: NextFunction) {
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

    public async buscarTodo(req: Request, res: Response, next: NextFunction) {
        if (!req.usuario) return res.status(401).json({ message: "Unauthorized" });

        const usuario = req.usuario;
        const idToDo = parseInt(req.params.todo_id);

        try {
            const todo: ToDo | undefined = await toDoService.obterToDo(usuario.id, idToDo);

            return res.status(200).json(todo);
        } catch (err) {
            next(err);
        }
    }
}

export const toDoList = new ToDoList();
