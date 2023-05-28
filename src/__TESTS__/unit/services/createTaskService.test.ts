import { AppError } from '../../../errors/AppError';
import { createTaskService } from '../../../services/createTaskService';

describe('createTaskService', () => {
    test('should return an error message if the title is empty', async () => {
        const taskData = { id: 1, titulo: '', concluida: true };

        await expect(createTaskService(taskData)).rejects.toThrow(
            'Titulo obrigatório!'
        );
    });

    test('should return an error message with status code 400 if the title is empty', async () => {
        const taskData = { id: 1, titulo: '', concluida: true };

        try {
            await createTaskService(taskData);
            fail('Expected createTaskService to throw an error');
        } catch (error: unknown) {
            expect(error).toBeInstanceOf(AppError);
            expect((error as AppError).message).toBe('Titulo obrigatório!');
            expect((error as AppError).statusCode).toBe(400);
        }
    });
});
