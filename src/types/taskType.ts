interface TaskType {
    title: string;
    id: string;
    projectId: string;
    userRef: string;
    duration: number;
    elapsedTime: number;
    completed: boolean;
}

export default TaskType