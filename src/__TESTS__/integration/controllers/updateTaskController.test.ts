import { updateTaskController } from '../../../controllers/updateTaskController';
import { updateTaskService } from '../../../services/updateTaskService';
import { AppError } from '../../../errors/AppError';
import { ITask } from '../../../types/interfaces/ITasks';

jest.mock('../../../services/updateTaskService');

describe('updateTaskController', () => {
    let req: any;
    let res: any;
    let next: any;

    beforeEach(() => {
        req = {
            params: { id: '1' },
            body: { titulo: 'Nova Tarefa', concluida: true },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    it('should update a task and return success message', async () => {
        const mockUpdateTaskService = updateTaskService as jest.MockedFunction<
            typeof updateTaskService
        >;
        mockUpdateTaskService.mockResolvedValueOnce({} as ITask);

        await updateTaskController(req, res, next);

        expect(mockUpdateTaskService).toHaveBeenCalledWith(1, {
            titulo: 'Nova Tarefa',
            concluida: true,
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            msg: 'Tarefa atualizada com sucesso!',
        });
    });

    it('should handle AppError and return error message', async () => {
        const mockUpdateTaskService = updateTaskService as jest.MockedFunction<
            typeof updateTaskService
        >;
        const error = new AppError('Titulo obrigatório!', 400);
        mockUpdateTaskService.mockRejectedValueOnce(error);

        await updateTaskController(req, res, next);

        expect(mockUpdateTaskService).toHaveBeenCalledWith(1, {
            titulo: 'Nova Tarefa',
            concluida: true,
        });
        expect(res.status).toHaveBeenCalledWith(error.statusCode);
        expect(res.json).toHaveBeenCalledWith({ msg: error.message });
    });

    it('should call next with error if not an AppError', async () => {
        const mockUpdateTaskService = updateTaskService as jest.MockedFunction<
            typeof updateTaskService
        >;
        const error = new Error('Internal Server Error');
        mockUpdateTaskService.mockRejectedValueOnce(error);

        await updateTaskController(req, res, next);

        expect(mockUpdateTaskService).toHaveBeenCalledWith(1, {
            titulo: 'Nova Tarefa',
            concluida: true,
        });
        expect(next).toHaveBeenCalledWith(error);
    });
});
