import { AppError } from '../errors/AppError';
import { saveTask } from '../repositories/taskRepository';
import { ITaskOptionalId } from '../types/types/taskTypes';

const createTaskService = async (taskData: ITaskOptionalId) => {
    if (!taskData.titulo) {
        throw new AppError('Titulo obrigatório!', 400);
    }

    const task = await saveTask({ ...taskData });

    return task;
};

export { createTaskService };
