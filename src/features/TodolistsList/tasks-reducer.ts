import {AddTodolistAC, RemoveTodolistAC, SetTodolistsAC} from "./todolists-reducer";
import {TaskType, TodolistApi, UpdateTaskModelType} from "../../api/todolist-api";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../../app/store";
import {SetAppErrorAC, SetAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

//Types
type ActionsType =
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof SetTodolistsAC>
    | ReturnType<typeof SetAppStatusAC>
    | ReturnType<typeof SetAppErrorAC>


export type TasksDispatchType = ThunkDispatch<TaskStateType, unknown, ActionsType>;
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
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task);
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model};
            }
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
        builder.addCase(setTasksTC.fulfilled, (state, action) => {
            if (action.payload) {
                state[action.payload.todolistId] = action.payload.tasks;
            }
        });
        builder.addCase(deleteTaskTC.fulfilled, (state, action) => {
            if (action.payload) {
                const tasks = state[action.payload.todolistId];
                // @ts-ignore
                const index = tasks.findIndex(t => t.id === action.payload.taskId);
                if (index > -1) {
                    tasks.splice(index, 1);
                }
            }
        });
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        })
    }
})

//Reducer

export const tasksReducer = slice.reducer;
export const {updateTaskAC} = slice.actions;

//Thunks

export const setTasksTC = createAsyncThunk('tasks/setTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(SetAppStatusAC({status: 'loading'}));
    try {
        const res = await TodolistApi.getTasks(todolistId)
        const tasks = res.data.items;
        thunkAPI.dispatch(SetAppStatusAC({status: 'succeeded'}));
        return {todolistId, tasks};
    } catch (error: any) {
        handleServerNetworkError(thunkAPI.dispatch, error.message);
    }
})
export const deleteTaskTC = createAsyncThunk('tasks/deleteTask', async (param: { todolistId: string, taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(SetAppStatusAC({status: 'loading'}));
    try {
        const res = await TodolistApi.deleteTask(param.todolistId, param.taskId)
        thunkAPI.dispatch(SetAppStatusAC({status: 'succeeded'}));
        return {taskId: param.taskId, todolistId: param.todolistId};
    } catch (error: any) {
        handleServerNetworkError(thunkAPI.dispatch, error.message);
    }
})

export const addTaskTC = createAsyncThunk('tasks/addTask', async (param: { todolistId: string, taskTitle: string }, thunkAPI) => {
    thunkAPI.dispatch(SetAppStatusAC({status: 'loading'}));
    try {
        const res = await TodolistApi.createTask(param.todolistId, param.taskTitle)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(SetAppStatusAC({status: 'succeeded'}));
            return res.data.data.item;
        } else {
            handleServerAppError(thunkAPI.dispatch, res.data);
            return thunkAPI.rejectWithValue(null);
        }
    } catch (err: any) {
        handleServerNetworkError(thunkAPI.dispatch, err.message);
        return thunkAPI.rejectWithValue(null);
    }
})

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

