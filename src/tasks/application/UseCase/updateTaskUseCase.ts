import { Task } from "../../domain/entities/task";
import { RepositoryTask} from "../../domain/port/repositoryTask";

export class UpdateTaskUseCase{
    constructor(readonly repositoryTask:RepositoryTask){}

    async update(
        uuid: string,
        title?: string,
        description?: string,
        ): Promise<Task | null> {
        
        try {
            const update = await this.repositoryTask.updateTask(uuid,title,description);
            return update;
        } catch (error) {
            return null;
        }
    }
}