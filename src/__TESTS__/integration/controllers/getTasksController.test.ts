import request from 'supertest';
import { app } from '../../../app';
import * as getTasksService from '../../../services/getTasksService';
import { AppError } from '../../../errors/AppError';

describe('integration tests getTasksController', () => {
    it('should return status code 200 and tasks', async () => {
        const tasksFromService = [
            { id: 1, titulo: 'Tarefa 1', concluida: false },
            { id: 2, titulo: 'Tarefa 2', concluida: true },
        ];

        jest.spyOn(getTasksService, 'getTasksService').mockResolvedValue(
            tasksFromService
        );

        const response = await request(app).get('/tarefas');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(tasksFromService);
        expect(getTasksService.getTasksService).toHaveBeenCalled();
    });

    it('should handle errors and return the error message', async () => {
        const errorMessage = 'tarefa não encontrada!';

        jest.spyOn(getTasksService, 'getTasksService').mockRejectedValue(
            new AppError(errorMessage, 404)
        );

        const response = await request(app).get('/tarefas');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ msg: errorMessage });
        expect(getTasksService.getTasksService).toHaveBeenCalled();
    });
});
