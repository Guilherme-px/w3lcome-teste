import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import { getTaskByIdService } from '../services/getTaskByIdService';

const getTaskByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    try {
        const task = await getTaskByIdService(Number(id));

        return res.status(200).json(task);
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ msg: error.message });
        } else {
            next(error);
        }
    }
};

export { getTaskByIdController };
