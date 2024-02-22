import { Task } from "../../domain/entities/task";
import { query } from "../../../database/mysql";
import { RepositoryTask } from "../../domain/port/repositoryTask";



export class MysqlTaskRepository implements RepositoryTask {

    async createTask(uuid: string, title: string, description: string): Promise<string | Task | null |  Error> {
        try {
            let sql = "INSERT INTO task(uuid, title,description) VALUES (?, ?, ?)";
            const params: any[] = [uuid,title,description];
            const result = await query(sql, params);


            return new Task(uuid,title,description);
        } catch (error) {
            console.error("Error adding user:", error);
            return error as Error;
        }
    }

    async getTasks(): Promise<Task[] | null> {
         try {
            const sql = "SELECT * FROM task";
            const [rows]: any = await query(sql); // Esto probablemente devuelve un tipo de dato más complejo
            if (!Array.isArray(rows)) {
                throw new Error('Rows is not an array'); // o maneja este caso como prefieras
            }
            const tasks: Task[] = rows.map(row => new Task(row.uuid, row.title, row.description));
            return tasks
        } catch (error) {
            console.error(error);
            return null; // retornas null o podrías optar por retornar un array vacío dependiendo de tu lógica de negocio
        }
    }

    async updateTask(uuid: string, title?: string | undefined, description?: string | undefined): Promise<Task | null> {
        
        const updates: { [key: string]: string } = {};
        if (title !== undefined) updates.title = title;
        if (description !== undefined) updates.description = description;

        const keys = Object.keys(updates);
        if (keys.length === 0) return null; // No hay nada que actualizar.

        const sqlParts = keys.map(key => `${key} = ?`);
        const sql = `UPDATE task SET ${sqlParts.join(', ')} WHERE uuid = ?`;

        try {
            const values = keys.map(key => updates[key]);
            values.push(uuid); // Añade el UUID al final del array de valores.
            await query(sql, values); // Ejecuta la consulta SQL.
          
            const [updatedRows]: any = await query('SELECT * FROM task WHERE uuid = ?', [uuid]);
            if (!updatedRows || updatedRows.length === 0) {
                throw new Error('No user found with the provided UUID.');
            }

            const updatedUser = new Task(
                updatedRows[0].uuid,
                updatedRows[0].title,
                updatedRows[0].description
            );

            return updatedUser;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }

        
    }

    async deleteTask(uuid: string): Promise<string | null> {
        try {
            const sql = 'DELETE FROM task WHERE uuid = ?';
            const result: any = await query(sql, [uuid]);
            if (result[0].affectedRows === 0){
                return null;
            } 

            return 'Task deleted successfully.';
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }
    }


}