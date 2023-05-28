import { AppError } from '../errors/AppError';
import { ITask } from '../types/interfaces/ITasks';

const createTaskService = async (taskData: ITask) => {
    if (!taskData.titulo) {
        throw new AppError('Titulo obrigatório!');
    }
};

export { createTaskService };
