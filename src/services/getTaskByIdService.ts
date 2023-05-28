import { AppError } from '../errors/AppError';
import { findTaskById } from '../repositories/taskRepository';

const getTaskByIdService = async (id: number) => {
    try {
        const task = await findTaskById(id);

        if (!task) {
            throw new AppError('Task not found!', 404);
        }

        return task;
    } catch (error) {
        throw new AppError('Failed to retrieve task', 500);
    }
};

export { getTaskByIdService };
