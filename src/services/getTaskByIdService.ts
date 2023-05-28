import { AppError } from '../errors/AppError';
import { findTaskById } from '../repositories/taskRepository';

const getTaskByIdService = async (id: number) => {
    const task = await findTaskById(id);

    if (!task) {
        throw new AppError('tarefa não encontrada!', 404);
    }

    return task;
};

export { getTaskByIdService };
