import { GetTasksUseCase } from "../../application/UseCase/getTasksUseCase";
import { Request,Response} from "express";
import { Task } from "../../domain/entities/task";


export class GetTaskController{

    constructor(readonly getTasksUseCase: GetTasksUseCase){}

    async run(req:Request, res:Response){
        try {
            const listTask = await this.getTasksUseCase.run()

            if(listTask){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        listTask
                    }
                })
            }else{
                return res.status(200).send({
                    status: "ok",
                    message: "Task not found"
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An error occurred while list the Task."
            });
        }
    }
}