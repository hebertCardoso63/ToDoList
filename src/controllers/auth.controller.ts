import { Request, Response } from 'express';
import { usuario } from '../services/usuario.service'
import { DadosCadastrais, Usuario, PayloadToken } from '../models/usuario.model';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';


export async function register(req: Request, res: Response) {
    const { nome_usuario, senha } = req.body;

    if (!nome_usuario || !senha) {
        return res.status(400).send('Nome de usuário e senha são obrigatórios');
    }

    try {
        const hashedPassword = await hashPassword(senha);
        
        const dadosCadastrais: DadosCadastrais = {
            nome_usuario,
            senha: hashedPassword,
        }

        const idUsuario = await usuario.cadastrar(dadosCadastrais);

        if (!idUsuario) {
            return res.status(401).send('Nome de usuário já existe');
        }

        return res.status(201).send('Usuário registrado com sucesso');
    } catch (error) {
        return res.status(500).send('Erro ao registrar usuário');
    }
}

export async function login(req: Request, res: Response) {
    const { nome_usuario, senha } = req.body;

    if (!nome_usuario || !senha) {
        return res.status(400).send('Nome de usuário e senha são obrigatórios');
    }

    try {
        const user: false | Usuario = await usuario.encontrarUsuario(nome_usuario);

        if (!user || !(await comparePassword(senha, user.senha))) {
            return res.status(401).send('Credenciais inválidas');
        }

        const payload: PayloadToken = {
            id: user.id,
            nome_usuario: user.nome_usuario,
        }

        const token = generateToken(payload);

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).send('Erro ao fazer login');
    }
}
