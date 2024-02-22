import { Task } from "../../domain/entities/task";
import { RepositoryTask} from "../../domain/port/repositoryTask";


export class GetTasksUseCase{
    constructor (readonly reposityTask:RepositoryTask){}

    async run():Promise<Task[] | null>{

        try {
            const  getAll = await this.reposityTask.getTasks();
            return  getAll;
        } catch (error) {
            return null;
        }
    }
    
}