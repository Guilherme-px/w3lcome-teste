import { AppError } from '../errors/AppError';
import { saveTask } from '../repositories/taskRepository';
import { ITask } from '../types/interfaces/ITasks';

const createTaskService = async (taskData: ITask) => {
    if (!taskData.titulo) {
        throw new AppError('Titulo obrigatório!', 400);
    }

    const task = await saveTask({ ...taskData })

    return task
};

export { createTaskService };
