import { Task } from "../entities/task";

export interface RepositoryTask{

    createTask(uuid:string,title:string,description:string):Promise<Task | null|string|Error>,

    getTasks():Promise<Task[] | null>;

    updateTask(uuid:string, title?:string,description?:string):Promise<Task|null>;

    deleteTask(uuid:string):Promise<string|null>;
}