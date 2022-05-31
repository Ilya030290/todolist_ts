import {AddTodolistAC, RemoveTodolistAC, SetTodolistsAC} from "./todolists-reducer";
import {TaskType, TodolistApi, UpdateTaskModelType} from "../../api/todolist-api";
import {ThunkDispatch, ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../../app/store";
import {SetAppErrorAC, SetAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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

const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{taskId: string, todolistId: string}>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks.splice(index, 1);
            }
        },
        addTaskAC(state, action: PayloadAction<{task: TaskType}>) {
            state[action.payload.task.todoListId].unshift(action.payload.task);
        },
        updateTaskAC(state, action: PayloadAction<{taskId: string, model: UpdateDomainTaskModelType, todolistId: string}>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model};
            }
        },
        setTasksAC(state, action: PayloadAction<{todolistId: string, tasks: TaskType[]}>) {
            state[action.payload.todolistId] = action.payload.tasks;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(AddTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(RemoveTodolistAC, (state, action) => {
            delete state[action.payload.id];
        });
        builder.addCase(SetTodolistsAC, (state, action) => {
            action.payload.todos.forEach((tl) => state[tl.id] = []);
        });
    }
})

//Reducer

export const tasksReducer = slice.reducer;
export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC} = slice.actions;

//ThunkCreators
export const setTasksTC = (todolistId: string): TasksThunkType => (dispatch: TasksDispatchType) => {
    dispatch(SetAppStatusAC({status: 'loading'}));
    TodolistApi.getTasks(todolistId)
        .then((res) => {
            dispatch(SetAppStatusAC({status: 'succeeded'}));
            dispatch(setTasksAC({todolistId: todolistId, tasks: res.data.items}));
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message);
        })
}

export const deleteTaskTC = (todolistId: string, taskId: string): TasksThunkType => (dispatch: TasksDispatchType) => {
    dispatch(SetAppStatusAC({status: 'loading'}));
    TodolistApi.deleteTask(todolistId, taskId)
        .then((res) => {
                dispatch(removeTaskAC({taskId: taskId, todolistId: todolistId}));
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
                dispatch(addTaskAC({task: res.data.data.item}));
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
                        dispatch(updateTaskAC({taskId: taskId, model: domainModel, todolistId: todolistId}));
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

