export interface Task {
    taskId?: number;
    name: string;
    description: string;
    deadline: string | null;
    categoryId: number;
}