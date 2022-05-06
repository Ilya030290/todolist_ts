import {TaskStateType} from '../App';
import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from "./todolists-reducer";
import {TaskStatuses, TaskType, TodolistApi} from "../api/todolist-api";
import {ThunkDispatch, ThunkAction} from "redux-thunk";


export type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskAT = {
    type: 'ADD-TASK'
    task: TaskType
}
export type ChangeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    status: TaskStatuses
    todolistId: string
}
export type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}

export type FetchTasksAT = ReturnType<typeof fetchTasksAC>

type ActionsType = RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTodolistsAT
    | FetchTasksAT

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "FETCH-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        case "SET-TODOLISTS":
            let stateCopy = {...state}
            action.todos.forEach((tl) => stateCopy[tl.id] = [])
            return stateCopy
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        case 'ADD-TASK':
            let stateCopy_ = {...state}
            const tasks = stateCopy_[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy_[action.task.todoListId] = newTasks;
            return stateCopy_
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
                    ...task,
                    status: action.status
                } : task)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
                    ...task,
                    title: action.title
                } : task)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
        case 'REMOVE-TODOLIST':
            let newState = {...state}
            delete newState[action.id]
            return newState
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskAT => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}

export const addTaskAC = (task: TaskType): AddTaskAT => {
    return {type: 'ADD-TASK', task}
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusAT => {
    return {type: 'CHANGE-TASK-STATUS', taskId: taskId, status, todolistId: todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleAT => {
    return {type: 'CHANGE-TASK-TITLE', taskId: taskId, title: title, todolistId: todolistId}
}

export const fetchTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: "FETCH-TASKS", todolistId, tasks} as const
}


//ThunkCreators

export type TasksDispatch = ThunkDispatch<TaskStateType, unknown, ActionsType>;
export type TasksThunkType = ThunkAction<void, TaskStateType, unknown, ActionsType>

export const fetchTasksTC = (todolistId: string): TasksThunkType => {
    return (dispatch: TasksDispatch) => {
        TodolistApi.getTasks(todolistId)
            .then((res) => {
                dispatch(fetchTasksAC(todolistId, res.data.items))
            })
    }
}

export const deleteTaskTC = (todolistId: string, taskId: string): TasksThunkType => {
    return (dispatch: TasksDispatch) => {
        TodolistApi.deleteTask(todolistId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(taskId, todolistId));
            })
    }
}

export const addTaskTC = (todolistId: string, taskTitle: string) => {
    return (dispatch: TasksDispatch) => {
        TodolistApi.createTask(todolistId, taskTitle)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item));
            })
    }
}
