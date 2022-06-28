import {addTodolistTC, removeTodolistTC, setTodolistsTC} from "./todolists-reducer";
import {TaskType, TodolistApi, UpdateTaskModelType} from "../../api/todolist-api";
import {AppRootStateType} from "../../app/store";
import {SetAppErrorAC, SetAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

//Types
type ActionsType = ReturnType<typeof SetAppStatusAC> | ReturnType<typeof SetAppErrorAC>


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
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.id];
        });
        builder.addCase(setTodolistsTC.fulfilled, (state, action) => {
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
        });
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            // @ts-ignore
            const tasks = state[action.payload.todolistId];
            // @ts-ignore
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                // @ts-ignore
                tasks[index] = {...tasks[index], ...action.payload.model};
            }
        });
    }
})

//Reducer

export const tasksReducer = slice.reducer;


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

export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (param: { todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType }, thunkAPI) => {
    const state = thunkAPI.getState() as AppRootStateType;
    const currentTask = state.tasks[param.todolistId].find((t) => t.id === param.taskId);

    if (currentTask) {
        const apiModel: UpdateTaskModelType = {
            title: currentTask.title,
            status: currentTask.status,
            description: currentTask.description,
            priority: currentTask.priority,
            startDate: currentTask.startDate,
            deadline: currentTask.deadline,
            ...param.domainModel
        }
        thunkAPI.dispatch(SetAppStatusAC({status: 'loading'}));
        try {
            const res = await TodolistApi.updateTask(param.todolistId, param.taskId, apiModel)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(SetAppStatusAC({status: 'succeeded'}));
                return {
                    taskId: param.taskId,
                    model: param.domainModel,
                    todolistId: param.todolistId
                };
            } else {
                handleServerAppError(thunkAPI.dispatch, res.data);
                return thunkAPI.rejectWithValue(null);
            }
        } catch (err: any) {
            handleServerNetworkError(thunkAPI.dispatch, err.message);
            return thunkAPI.rejectWithValue(null);
        }
    }
})

