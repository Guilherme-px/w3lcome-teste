import { ITask } from '../types/interfaces/ITasks';
import { ITaskOptionalId } from '../types/types/taskTypes';

const tasks: Array<ITask> = [];

function generateId() {
    const lastId = tasks.length > 0 ? tasks[tasks.length - 1].id : 0;
    return lastId + 1;
}

function saveTask(task: Omit<ITask, 'id'>) {
    const newTask = { id: generateId(), titulo: task.titulo, concluida: false };
    tasks.push(newTask);
    return newTask;
}

function findTasks() {
    return tasks;
}

async function findTaskById(id: number): Promise<ITask | null> {
    const task = await tasks.find((task) => task.id === id);
    return task !== undefined ? task : null;
}

function updateTask(id: number, updatedTask: ITaskOptionalId): ITask | null {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
        return tasks[taskIndex];
    }
    return null;
}

function deleteTask(id: number): ITask | null {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
        const deletedTask = tasks.splice(taskIndex, 1)[0];
        return deletedTask;
    }
    return null;
}

export { saveTask, findTasks, findTaskById, updateTask, deleteTask };
