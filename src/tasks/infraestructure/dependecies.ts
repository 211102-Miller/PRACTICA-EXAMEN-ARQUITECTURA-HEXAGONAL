import { MysqlTaskRepository } from "./repository/mysqlTaskRepository";
import { CreateTaskUseCase } from "../application/UseCase/createTaskUseCase";
import { CreateTaskController } from "./controllers/createTaskController";
import { GetTasksUseCase } from "../application/UseCase/getTasksUseCase";
import { GetTaskController } from "./controllers/getTasksController";
import { UpdateTaskUseCase } from "../application/UseCase/updateTaskUseCase";
import { UpdateTaskController } from "./controllers/updateTaskController";
import { DeleteTaskUseCase } from "../application/UseCase/deleteTaskUseCase";
import { DeleteTaskController } from "./controllers/deleteTaskController";

export const mysqlTaskRepository = new MysqlTaskRepository();

export const createTaskUseCase =  new CreateTaskUseCase(mysqlTaskRepository);
export const  createTaskController =  new CreateTaskController(createTaskUseCase);

export const getTasksUseCase =  new GetTasksUseCase(mysqlTaskRepository);
export const getTaskController =  new GetTaskController(getTasksUseCase);

export const updateTaskUseCase =  new UpdateTaskUseCase(mysqlTaskRepository);
export const updateTaskController =  new UpdateTaskController(updateTaskUseCase);

export const deleteTaskUseCase =  new DeleteTaskUseCase(mysqlTaskRepository);
export const deleteTaskController =  new DeleteTaskController(deleteTaskUseCase);



