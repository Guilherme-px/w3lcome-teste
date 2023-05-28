import { Router } from 'express';
import { createTaskController } from '../controllers/createTaskController';
import { getTasksController } from '../controllers/getTasksController';
import { getTaskByIdController } from '../controllers/getTaskByIdController';

const routes = Router();

routes.post('/', createTaskController);
routes.get('/', getTasksController);
routes.get('/:id', getTaskByIdController);

export default routes;
