import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '262e2c2b-b3e7-4ca9-aebd-afd6b759e25e'
    }
})

//Types
export type TodoType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type CommonResponseType<T={}> = {
    fieldsErrors: string[],
    messages: string[],
    resultCode: number,
    data: T
}
type GetTasksResponse = {
    items: TaskType[]
    totalCount: number
    error: string | null
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

//Api
export const TodolistApi = {
    getTodos: () => {
        return instance.get<TodoType[]>('todo-lists');
    },
    createTodo: (title: string) => {
        return instance.post<any, AxiosResponse<CommonResponseType<{item: TodoType}>>, {title: string}>('todo-lists', {title});
    },
    deleteTodo: (todolistId: string) => {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`);
    },
    updateTodoTitle: (todolistId: string, title: string) => {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title});
    },
    getTasks: (todolistId: string) => {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    createTask: (todolistId: string, taskTitle: string) => {
        return instance.post<CommonResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle});
    },
    deleteTask: (todolistId: string, taskId: string) => {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    updateTask: (todolistId: string, taskId: string, model: UpdateTaskModelType) => {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}