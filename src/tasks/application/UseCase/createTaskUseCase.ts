import { Task } from "../../domain/entities/task";
import { RepositoryTask } from "../../domain/port/repositoryTask";
import { v4 as uuid } from "uuid";


export class CreateTaskUseCase{
    constructor (readonly reposityTask:RepositoryTask){}
    
    async run( title:string,  description:string):Promise<Task | null | string  |Error>{

        const miuuid = uuid();

        try {
            const  create = await this.reposityTask.createTask(miuuid,title,description);
            return  create;
        } catch (error) {
            return null;
        }
    }
}