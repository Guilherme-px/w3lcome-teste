import { findTasks } from '../repositories/taskRepository';

const getTasksService = async () => {
    const tasks = await findTasks();

    return tasks;
};

export { getTasksService };
