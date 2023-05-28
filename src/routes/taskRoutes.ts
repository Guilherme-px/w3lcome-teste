import { Router } from 'express';
import { createTaskController } from '../controllers/createTaskController';
import { getTasksController } from '../controllers/getTasksController';

const routes = Router();

routes.post('/', createTaskController);
routes.get('/', getTasksController);

export default routes;
