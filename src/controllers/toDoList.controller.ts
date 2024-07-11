import { Request, Response, NextFunction } from "express";
import { toDo as toDoService } from "../services/toDo.service";
import { ToDo, CriarToDo, AtualizarToDo } from "../models/todo.model";

class ToDoList {
    constructor() {
        this.listarToDos = this.listarToDos.bind(this);
        this.cadastrarToDo = this.cadastrarToDo.bind(this);
        this.buscarTodo = this.buscarTodo.bind(this);
        this.editarToDo = this.editarToDo.bind(this);
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

            if (!todo) {
                return res.status(400).json({ message: 'Registro não encontrado.' });
            }

            return res.status(200).json(todo);
        } catch (err) {
            next(err);
        }
    }

    public async editarToDo(req: Request, res: Response, next: NextFunction) {
        if (!req.usuario) return res.status(401).json({ message: "Unauthorized" });

        const usuario = req.usuario;
        const idToDo = parseInt(req.params.todo_id);
        const dadosEdit = req.body as AtualizarToDo;

        try {
            const idRegistroAlterado: number | undefined = await toDoService.editarTodo(usuario.id, idToDo, dadosEdit);

            if (!idRegistroAlterado) return res.status(400).json({ message: 'Registro não encontrado.' });

            return res.status(200).json({ message: 'Alteração realizada.', id: idRegistroAlterado});
        } catch (err) {
            next(err);
        }
    }

    public async excluirToDo(req: Request, res: Response, next: NextFunction) {
        if (!req.usuario) return res.status(401).json({ message: "Unauthorized" });

        const usuario = req.usuario;
        const idToDo = parseInt(req.params.todo_id);

        try {
            const idRegistroAlterado: number | undefined = await toDoService.excluirToDo(usuario.id, idToDo);

            if (!idRegistroAlterado) return res.status(400).json({ message: 'Registro não encontrado.' });

            return res.status(200).json({ message: 'Registro excluido.', id: idRegistroAlterado});
        } catch (err) {
            next(err);
        }
    }
}

export const toDoList = new ToDoList();
