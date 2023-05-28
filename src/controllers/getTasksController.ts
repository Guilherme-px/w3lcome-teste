import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import { getTasksService } from '../services/getTasksService';

const getTasksController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const tasks = await getTasksService();

        return res.status(200).json(tasks);
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ msg: error.message });
        } else {
            next(error);
        }
    }
};

export { getTasksController };
