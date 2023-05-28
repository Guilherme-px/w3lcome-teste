import { createTaskService } from '../../../services/createTaskService';

describe('Integration tests createTaskService', () => {
    test('should return a task when the task is successfully saved', async () => {
        const taskData = { titulo: 'Aprender React', concluida: true };

        const task = await createTaskService(taskData);

        expect(task.id).toBe(1);
        expect(task.titulo).toBe('Aprender React');
        expect(task.concluida).toBe(true);
    });
});
