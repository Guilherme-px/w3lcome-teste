import { createTaskService } from '../../../services/createTaskService';

describe('createTaskService', () => {
    test('should return an error message if the title is empty', async () => {
        const taskData = { id: 1, titulo: '', concluida: true };

        await expect(async () => {
            await createTaskService(taskData);
        }).rejects.toThrow('Titulo obrigatório!');
    });
});
