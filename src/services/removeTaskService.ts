import { AppError } from '../errors/AppError';
import { deleteTask } from '../repositories/taskRepository';

const removeTaskService = async (id: number) => {
    const task = await deleteTask(id);

    if (!task) {
        throw new AppError('Id não encontrado', 404);
    }

    return task;
};

export { removeTaskService };
