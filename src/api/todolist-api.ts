import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '262e2c2b-b3e7-4ca9-aebd-afd6b759e25e'
    }
})

type TodoType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type CommonResponseType<T={}> = {
    fieldsErrors: string[],
    messages: string[],
    resultCode: number,
    data: T
}


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
    }
}