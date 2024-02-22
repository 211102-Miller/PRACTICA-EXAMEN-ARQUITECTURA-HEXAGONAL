import express  from "express";
import { createTaskController,getTaskController,updateTaskController,deleteTaskController } from "../dependecies";

export const taskRouter = express.Router();


taskRouter.post("/", createTaskController.run.bind(createTaskController));
taskRouter.get("/", getTaskController.run.bind(getTaskController));
taskRouter.put("/", updateTaskController.run.bind(updateTaskController));
taskRouter.delete("/", deleteTaskController.run.bind(deleteTaskController));






