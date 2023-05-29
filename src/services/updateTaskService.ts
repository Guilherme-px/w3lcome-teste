import { AppError } from '../errors/AppError';
import { updateTask } from '../repositories/taskRepository';
import { ITaskOptionalId } from '../types/types/taskTypes';

const updateTaskService = async (id: number, taskData: ITaskOptionalId) => {
    if (!taskData.titulo) {
        throw new AppError('Titulo obrigatório!', 400);
    }

    const newTask = {
        titulo: taskData.titulo,
        concluida: taskData.concluida,
    };

    const task = await updateTask(id, newTask);

    if (!task) {
        throw new AppError('Id não encontrado', 404);
    }

    return task;
};

export { updateTaskService };
