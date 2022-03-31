import {TaskStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";

export type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskAT = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}

export type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}

type ActionsType = RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodolistAT
    | RemoveTodolistAT;

export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]}
        case 'CHANGE-TASK-STATUS':
            return {...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {...task, isDone: action.isDone} : task)}
        case 'CHANGE-TASK-TITLE':
            return {...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {...task, title: action.title} : task)}
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
        case 'REMOVE-TODOLIST':
            let newState = {...state}
            delete newState[action.id]
            return newState
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskAT => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskAT => {
    return {type: 'ADD-TASK', title: title, todolistId: todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusAT => {
    return {type: 'CHANGE-TASK-STATUS', taskId: taskId, isDone: isDone, todolistId: todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleAT => {
    return {type: 'CHANGE-TASK-TITLE', taskId: taskId, title: title, todolistId: todolistId}
}