import { findTasks } from '../../../repositories/taskRepository';
import { getTasksService } from '../../../services/getTasksService';

jest.mock('../../../repositories/taskRepository', () => ({
    findTasks: jest.fn(),
}));

describe('unit tests getTasksService', () => {
    it('should return all task data when performing the search', async () => {
        const tasksFromRepository = [
            { id: 1, title: 'Tarefa 1', completed: false },
            { id: 2, title: 'Tarefa 2', completed: true },
        ];

        (findTasks as jest.Mock).mockResolvedValue(tasksFromRepository);

        const result = await getTasksService();

        expect(result).toEqual(tasksFromRepository);

        expect(findTasks).toHaveBeenCalled();
    });
});
