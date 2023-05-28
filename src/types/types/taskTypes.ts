import { ITask } from '../interfaces/ITasks';

export type ITaskOptionalId =
    | ITask
    | { id?: number; titulo: string; concluida: boolean };
