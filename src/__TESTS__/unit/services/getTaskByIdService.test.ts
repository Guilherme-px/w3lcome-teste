import { getTaskByIdService } from '../../../services/getTaskByIdService';
import { findTaskById } from '../../../repositories/taskRepository';
import { AppError } from '../../../errors/AppError';

jest.mock('../../../repositories/taskRepository', () => ({
    findTaskById: jest.fn(),
}));

describe('Unit test getTaskByIdService', () => {
    it('should return the task when successfully found in the repository', async () => {
        const taskId = 1;
        const mockTask = { id: taskId, title: 'Task 1', completed: false };

        (findTaskById as jest.Mock).mockResolvedValue(mockTask);

        const task = await getTaskByIdService(taskId);

        expect(task).toEqual(mockTask);
        expect(findTaskById).toHaveBeenCalledWith(taskId);
    });

    it('should throw an AppError with status code 404 when the task is not found in the repository', async () => {
        const taskId = 1;

        (findTaskById as jest.Mock).mockResolvedValue(null);

        await expect(getTaskByIdService(taskId)).rejects.toThrow(AppError);
        expect(findTaskById).toHaveBeenCalledWith(taskId);
    });

    it('should throw an AppError with status code 404 when an error occurs during task retrieval', async () => {
        const taskId = 1;
        const mockErrorMessage = 'tarefa não encontrada!';

        (findTaskById as jest.Mock).mockRejectedValue(
            new AppError(mockErrorMessage, 404)
        );

        await expect(getTaskByIdService(taskId)).rejects.toThrow(AppError);
        expect(findTaskById).toHaveBeenCalledWith(taskId);
    });
});
