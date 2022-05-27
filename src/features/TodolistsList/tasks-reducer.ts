import {AddTodolistAC, RemoveTodolistAC, SetTodolistsAC} from "./todolists-reducer";
import {TaskType, TodolistApi, UpdateTaskModelType} from "../../api/todolist-api";
import {ThunkDispatch, ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../../app/store";
import {SetAppErrorAC, SetAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

//Types
type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof SetTodolistsAC>
    | ReturnType<typeof SetAppStatusAC>
    | ReturnType<typeof SetAppErrorAC>


export type TasksDispatchType = ThunkDispatch<TaskStateType, unknown, ActionsType>;
export type TasksThunkType = ThunkAction<void, TaskStateType, unknown, ActionsType>;
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
};

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TaskStateType = {};

//Reducer
export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks};
        case "SET-TODOLISTS":
            let stateCopy = {...state};
            action.todos.forEach((tl) => stateCopy[tl.id] = []);
            return stateCopy;
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)};
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]};
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {...task, ...action.model} : task)
            };
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []};
        case 'REMOVE-TODOLIST':
            let newState = {...state};
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
}

//ActionCreators
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const);

export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const);

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', taskId, model, todolistId} as const);

export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
    ({type: "SET-TASKS", todolistId, tasks} as const);


//ThunkCreators
export const setTasksTC = (todolistId: string): TasksThunkType => (dispatch: TasksDispatchType) => {
    dispatch(SetAppStatusAC({status: 'loading'}));
    TodolistApi.getTasks(todolistId)
        .then((res) => {
            dispatch(SetAppStatusAC({status: 'succeeded'}));
            dispatch(setTasksAC(todolistId, res.data.items));
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message);
        })
}

export const deleteTaskTC = (todolistId: string, taskId: string): TasksThunkType => (dispatch: TasksDispatchType) => {
    dispatch(SetAppStatusAC({status: 'loading'}));
    TodolistApi.deleteTask(todolistId, taskId)
        .then((res) => {
                dispatch(removeTaskAC(taskId, todolistId));
                dispatch(SetAppStatusAC({status: 'succeeded'}));
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message);
        })
}

export const addTaskTC = (todolistId: string, taskTitle: string): TasksThunkType => (dispatch: TasksDispatchType) => {
    dispatch(SetAppStatusAC({status: 'loading'}));
    TodolistApi.createTask(todolistId, taskTitle)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item));
                dispatch(SetAppStatusAC({status: 'succeeded'}));
            } else {
                handleServerAppError(dispatch, res.data);
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message);
        })
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: TasksDispatchType, getState: () => AppRootStateType) => {

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
            dispatch(SetAppStatusAC({status: 'loading'}));
            TodolistApi.updateTask(todolistId, taskId, apiModel)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC(taskId, domainModel, todolistId));
                        dispatch(SetAppStatusAC({status: 'succeeded'}));
                    } else {
                        handleServerAppError(dispatch, res.data);
                    }
                })
                .catch((err: AxiosError) => {
                    handleServerNetworkError(dispatch, err.message);
                })
        }
    }

