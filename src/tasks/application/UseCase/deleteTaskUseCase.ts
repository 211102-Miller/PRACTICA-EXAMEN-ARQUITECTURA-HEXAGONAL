import { Task } from "../../domain/entities/task";
import { RepositoryTask } from "../../domain/port/repositoryTask";


export class DeleteTaskUseCase{

    constructor(readonly repositoryTask: RepositoryTask){}

    async run(uuid:string):Promise<string | null>{

        try {
            const deletes = await this.repositoryTask.deleteTask(uuid);
            return deletes;
        } catch (error) {
            return null
        }
    }
}