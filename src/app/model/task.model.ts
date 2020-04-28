export class Task {
    taskId: number;
    task: string;
    parentTaskId: number;
    parentTask: string;
    priority: number;
    startDate: string;
    endDate: string;
    project: string;
    projectId: number;
    manager: string;
    managerId: number;
    parentTaskTbl: any;
    userTbl: any;
    projectTbl: any;
    parentTaskSelected: boolean;
}
