import request from 'supertest';
import { app } from '../../../app';
import * as getTaskByIdService from '../../../services/getTaskByIdService';
import { AppError } from '../../../errors/AppError';
import { ITask } from '../../../types/interfaces/ITasks';

jest.mock('../../../services/getTaskByIdService');

describe('Integration tests for getTaskByIdController', () => {
    it('should return the task when successfully found in the service', async () => {
        const taskId = 1;
        const mockTask: ITask = {
            id: taskId,
            titulo: 'tarefa 1',
            concluida: false,
        };

        jest.spyOn(getTaskByIdService, 'getTaskByIdService').mockResolvedValue(
            mockTask
        );

        const response = await request(app).get(`/tarefas/${taskId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockTask);
        expect(getTaskByIdService.getTaskByIdService).toHaveBeenCalledWith(
            taskId
        );
    });

    it('should handle errors and return the error message', async () => {
        const taskId = 1;
        const errorMessage = 'tarefa não encontrada!';

        jest.spyOn(getTaskByIdService, 'getTaskByIdService').mockRejectedValue(
            new AppError(errorMessage, 404)
        );

        const response = await request(app).get(`/tarefas/${taskId}`);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ msg: errorMessage });
        expect(getTaskByIdService.getTaskByIdService).toHaveBeenCalledWith(
            taskId
        );
    });
});
