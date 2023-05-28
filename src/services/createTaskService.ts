import { ITask } from '../types/interfaces/ITasks';

const createTaskService = async (taskData: ITask) => {
    if (!taskData.titulo) {
        throw new Error('Titulo obrigatório!');
    }
};

export { createTaskService };
