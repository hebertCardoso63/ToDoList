export interface PayloadToken {
    id: number;
    nome_usuario: string;
}

export interface DadosCadastrais {
    nome_usuario: string;
    senha: string;
}

export interface Usuario {
    id: number;
    nome_usuario: string;
    senha: string;
    data_criacao: Date;
    data_atualizacao: Date;
    data_exclusao?: Date | null;
}
