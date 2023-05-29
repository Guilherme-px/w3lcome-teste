import { NextFunction, Request, Response } from 'express';
import { removeTaskService } from '../services/removeTaskService';
import { AppError } from '../errors/AppError';

const removeTaskController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    try {
        await removeTaskService(Number(id));

        return res.status(201).json({ msg: 'Tarefa excluida com sucesso!' });
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ msg: error.message });
        } else {
            next(error);
        }
    }
};

export { removeTaskController };
