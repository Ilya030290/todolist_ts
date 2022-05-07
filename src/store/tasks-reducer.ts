import {TaskStateType} from '../App';
import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from "./todolists-reducer";
import {TaskType, TodolistApi, UpdateTaskModelType} from "../api/todolist-api";
import {ThunkDispatch, ThunkAction} from "redux-thunk";
import {AppRootStateType} from "./store";


export type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskAT = {
    type: 'ADD-TASK'
    task: TaskType
}
export type UpdateTaskAT = {
    type: 'UPDATE-TASK'
    taskId: string
    todolistId: string
    model: UpdateDomainTaskModelType
}

export type SetTasksAT = ReturnType<typeof setTasksAC>

type ActionsType = RemoveTaskAT
    | AddTaskAT
    | UpdateTaskAT
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTodolistsAT
    | SetTasksAT

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        case "SET-TODOLISTS":
            let stateCopy = {...state}
            action.todos.forEach((tl) => stateCopy[tl.id] = [])
            return stateCopy
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        case 'ADD-TASK':
            return  {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {...task, ...action.model} : task)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
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

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): UpdateTaskAT => {
    return {type: 'UPDATE-TASK', taskId: taskId, model, todolistId: todolistId}
}

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: "SET-TASKS", todolistId, tasks} as const
}


//ThunkCreators

export type TasksDispatch = ThunkDispatch<TaskStateType, unknown, ActionsType>;
export type TasksThunkType = ThunkAction<void, TaskStateType, unknown, ActionsType>

export const setTasksTC = (todolistId: string): TasksThunkType => {
    return (dispatch: TasksDispatch) => {
        TodolistApi.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(todolistId, res.data.items))
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

export const addTaskTC = (todolistId: string, taskTitle: string): TasksThunkType => {
    return (dispatch: TasksDispatch) => {
        TodolistApi.createTask(todolistId, taskTitle)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item));
            })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: TasksDispatch, getState: () => AppRootStateType) => {

        const state = getState();
        const currentTask = state.tasks[todolistId].find((t) => t.id === taskId);

        if (currentTask) {
            const apiModel: UpdateTaskModelType = {
                title: currentTask.title,
                status: currentTask.status,
                description: currentTask.description,
                priority: currentTask.priority,
                startDate: currentTask.startDate,
                deadline: currentTask.deadline,
                ...domainModel
            }

            TodolistApi.updateTask(todolistId, taskId, apiModel)
                .then((res) => {
                    dispatch(updateTaskAC(taskId, domainModel, todolistId));
                })
        }

    }
}

