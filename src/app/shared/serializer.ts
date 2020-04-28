import { Task } from '../model/task.model';

export class Serializer {
    fromJson(json: any): Task {

        const task = new Task();
        task.taskId = json.id;
        task.task = json.task;
        task.parentTaskId = json.parentTaskId;
        task.parentTask = json.parentTaskId;
        task.priority = json.priority;
        task.startDate = json.startDate;
        task.endDate = json.endDate;

        return task;
    }

    toJson(task: Task): any {
        return {
            taskId: task.taskId,
            task: task.task,
            parentTaskId: task.parentTaskId,
            parentTask: task.parentTask,
            priority: task.priority,
            startDate: task.startDate,
            endDate: task.endDate            
        };
    }
}
