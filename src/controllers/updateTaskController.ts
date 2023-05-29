import { NextFunction, Request, Response } from 'express';
import { updateTaskService } from '../services/updateTaskService';
import { AppError } from '../errors/AppError';

const updateTaskController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const taskData = { ...req.body };

    try {
        await updateTaskService(Number(id), taskData);

        return res.status(201).json({ msg: 'Tarefa atualizada com sucesso!' });
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ msg: error.message });
        } else {
            next(error);
        }
    }
};

export { updateTaskController };
