import { ITask } from '../types/interfaces/ITasks';

const tasks: Array<ITask> = [];

function generateId() {
    const lastId = tasks.length > 0 ? tasks[tasks.length - 1].id : 0;
    return lastId + 1;
}

function saveTask(task: Omit<ITask, 'id'>) {
    const newTask = { id: generateId(), ...task };
    tasks.push(newTask);
    return newTask;
}

function findTaskById(id: number) {}

function updateTask(id: number, updatedTask: ITask) {}

function deleteTask(id: number) {}

export { saveTask, findTaskById, updateTask, deleteTask };
