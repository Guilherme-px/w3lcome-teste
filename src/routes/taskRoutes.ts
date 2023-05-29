import { Router } from 'express';
import { createTaskController } from '../controllers/createTaskController';
import { getTasksController } from '../controllers/getTasksController';
import { getTaskByIdController } from '../controllers/getTaskByIdController';
import { updateTaskController } from '../controllers/updateTaskController';
import { removeTaskController } from '../controllers/removeTaskController';

const routes = Router();

routes.post('/', createTaskController);
routes.get('/', getTasksController);
routes.get('/:id', getTaskByIdController);
routes.put('/:id', updateTaskController);
routes.delete('/:id', removeTaskController);

export default routes;
