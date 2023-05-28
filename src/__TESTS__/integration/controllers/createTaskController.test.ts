import request from 'supertest';
import { app } from '../../../app';
import * as createTaskService from '../../../services/createTaskService';
import { AppError } from '../../../errors/AppError';

describe('integration tests createTaskController', () => {
    it('should return status code 201 and success message when task is created successfully', async () => {
        const requestData = {
            titulo: 'tarefa',
            concluida: true,
        };
        const createTaskServiceMock = jest.spyOn(
            createTaskService,
            'createTaskService'
        );

        createTaskServiceMock.mockResolvedValue({
            id: 1,
            titulo: 'Tarefa',
            concluida: true,
        });

        const response = await request(app).post('/tarefas').send(requestData);

        expect(response.status).toBe(201);
        expect(response.body.msg).toBe('Tarefa criada com sucesso!');
        expect(createTaskServiceMock).toHaveBeenCalledWith(requestData);
    });

    it('should return error status code and error message when an error occurs', async () => {
        const requestData = {
            titulo: '',
            concluida: true,
        };

        const errorMessage = 'Titulo obrigatório!';

        const createTaskServiceMock = jest
            .fn()
            .mockRejectedValue(new AppError(errorMessage, 400));
        jest.spyOn(createTaskService, 'createTaskService').mockImplementation(
            createTaskServiceMock
        );

        const response = await request(app).post('/tarefas').send(requestData);

        expect(response.status).toBe(400);
        expect(response.body.msg).toBe(errorMessage);
        expect(createTaskServiceMock).toHaveBeenCalledWith(requestData);
    });
});
