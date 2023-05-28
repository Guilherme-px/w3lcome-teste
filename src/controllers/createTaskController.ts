import { NextFunction, Request, Response } from 'express';
import { createTaskService } from '../services/createTaskService';
import { AppError } from '../errors/AppError';

const createTaskController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const taskData = { ...req.body };

    try {
        await createTaskService(taskData);

        return res.status(200).json({ msg: 'Tarefa criada com sucesso!' });
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ msg: error.message });
        } else {
            next(error);
        }
    }
};

export { createTaskController };
