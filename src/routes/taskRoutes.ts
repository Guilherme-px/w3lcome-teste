import { Router } from 'express';
import { createTaskController } from '../controllers/createTaskController';

const routes = Router();

routes.post('/', createTaskController);

export default routes;
