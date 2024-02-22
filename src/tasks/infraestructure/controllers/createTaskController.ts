import { CreateTaskUseCase } from "../../application/UseCase/createTaskUseCase";
import { Request,Response} from "express";
import { Task } from "../../domain/entities/task";


export class CreateTaskController{

    constructor(readonly createTaskUseCase: CreateTaskUseCase){}

    async run(req:Request,res:Response){
        try {
            let {title,description} =  req.body;

            const create =  await  this.createTaskUseCase.run(title,description);

            if (create instanceof Task) {
                return res.status(201).send({
                    status: "succes",
                    data: {
                        uuid: create.uuid,
                        title: create.title,
                        description: create.description
                        
                    }
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
                message: "An error occurred while delete the user."
            });
        }
    }
}