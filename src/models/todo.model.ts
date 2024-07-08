export interface ToDo {
    id: number;
    titulo: string;
    descricao?: string;
    status: string;
    data_criacao: Date;
    data_atualizacao: Date;
    data_exclusao?: Date | null;
    usuario_id: number;
}
