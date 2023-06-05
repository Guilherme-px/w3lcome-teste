import { updateTaskService } from '../../../services/updateTaskService';
import { updateTask } from '../../../repositories/taskRepository';
import { AppError } from '../../../errors/AppError';

jest.mock('../../../repositories/taskRepository');

describe('updateTaskService', () => {
    it('should update a task and return the updated task', async () => {
        const mockUpdateTask = updateTask as jest.MockedFunction<
            typeof updateTask
        >;
        const updatedTask = { id: 1, titulo: 'Nova Tarefa', concluida: true };
        mockUpdateTask.mockReturnValueOnce(updatedTask);

        const result = await updateTaskService(1, {
            titulo: 'Nova Tarefa',
            concluida: true,
        });

        expect(mockUpdateTask).toHaveBeenCalledWith(1, {
            titulo: 'Nova Tarefa',
            concluida: true,
        });
        expect(result).toEqual(updatedTask);
    });

    it('should throw an AppError if titulo is missing', async () => {
        const mockUpdateTask = updateTask as jest.MockedFunction<
            typeof updateTask
        >;
        mockUpdateTask.mockReturnValueOnce(null);

        await expect(
            updateTaskService(1, {
                concluida: true,
                titulo: '',
            })
        ).rejects.toThrow(AppError);
    });

    it('should throw an AppError if task is not found', async () => {
        const mockUpdateTask = updateTask as jest.MockedFunction<
            typeof updateTask
        >;
        mockUpdateTask.mockReturnValueOnce(null);

        await expect(
            updateTaskService(1, {
                titulo: 'Nova Tarefa',
                concluida: false,
            })
        ).rejects.toThrow(AppError);
    });
});
