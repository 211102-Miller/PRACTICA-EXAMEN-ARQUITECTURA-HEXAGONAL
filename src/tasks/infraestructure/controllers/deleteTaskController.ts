import { DeleteTaskUseCase } from "../../application/UseCase/deleteTaskUseCase";
import { Request,Response} from "express";


export class DeleteTaskController{
    constructor(readonly deleteTaskUseCase: DeleteTaskUseCase){}


    async run(req:Request,res:Response){
        try {

            let { uuid } = req.params;
        
            let deletes = await this.deleteTaskUseCase.run(uuid)

            if(deletes){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        message: deletes
                    }
                })
            }
            else{
                return res.status(404).send({
                    status: "error",
                    message: "Task not found."
                });
            }
        } catch (error) {  
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
            } 
            return res.status(500).send({
                status: "error",
                message: "An error occurred while delete the Task."
            });
        }
    }
}