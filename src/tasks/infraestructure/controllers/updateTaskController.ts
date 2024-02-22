import { Request,Response } from "express";
import { UpdateTaskUseCase } from "../../application/UseCase/updateTaskUseCase";

export class UpdateTaskController{
    constructor( readonly updateTaskUseCase:UpdateTaskUseCase){}

    async run(req:Request, res:Response) {
        try {

            let {uuid,title,description} = req.body
        
            let update = await this.updateTaskUseCase.update(uuid,title,description)

            if(update){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        update_user: update
                    }
                })
            }else{
                return res.status(404).send({
                    status: "error",
                    message: "Task not found "
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
                message: "An error occurred while update the task."
            });   
        }
    }
}