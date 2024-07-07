
class ToDo {
    public async obterListaTarefas(): Promise<any>{
        try {
            console.log(999);
        } catch (e) {
            throw new Error('Falha ao listar dispositivos');
        }
    }
}

export const toDo = new ToDo();