import {TodolistApi, TodoType} from "../../api/todolist-api";
import {RequestStatusType, SetAppErrorAC, SetAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


//Types
export type ActionsType =
      ReturnType<typeof ChangeTodolistFilterAC>
    | ReturnType<typeof SetAppStatusAC>
    | ReturnType<typeof SetAppErrorAC>
    | ReturnType<typeof ChangeTodolistEntityStatusAC>

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = TodoType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const slice = createSlice({
    name: "todolists",
    initialState: [] as Array<TodolistType>,
    reducers: {
        ChangeTodolistFilterAC(state, action: PayloadAction<{id: string, filter: FilterValuesType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].filter = action.payload.filter;
        },
        ChangeTodolistEntityStatusAC(state, action: PayloadAction<{id: string, entityStatus: RequestStatusType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].entityStatus = action.payload.entityStatus;
        }
    },
    extraReducers: builder => {
        builder.addCase(setTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todos.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
        });
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            if (index > -1) {
                state.splice(index, 1);
            }
        });
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        });
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].title = action.payload.title;
        })
    }
});

//Reducer
export const todolistsReducer = slice.reducer;
export const {
    ChangeTodolistFilterAC,
    ChangeTodolistEntityStatusAC
} = slice.actions;

//ThunkCreators
export const setTodolistsTC = createAsyncThunk('todolists/setTodolists', async(param, thunkAPI) => {
    thunkAPI.dispatch(SetAppStatusAC({status: 'loading'}));
    try {
        const res = await TodolistApi.getTodos();
        thunkAPI.dispatch(SetAppStatusAC({status: 'succeeded'}));
        return {todos: res.data};
    } catch (err: any) {
        handleServerNetworkError(thunkAPI.dispatch, err.message);
        return thunkAPI.rejectWithValue(null);
    }
})

export const removeTodolistTC = createAsyncThunk('todolists/removeTodolist',async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(SetAppStatusAC({status: 'loading'}));
    thunkAPI.dispatch(ChangeTodolistEntityStatusAC({id: todolistId, entityStatus: 'loading'}));
    try {
        const res = await TodolistApi.deleteTodo(todolistId);
        thunkAPI.dispatch(SetAppStatusAC({status: 'succeeded'}));
        return {id: todolistId};
    } catch (err: any) {
        handleServerNetworkError(thunkAPI.dispatch, err.message);
        return thunkAPI.rejectWithValue(null);
    }
})

export const addTodolistTC = createAsyncThunk('todolists/addTodolist', async (title: string, thunkAPI) => {
    thunkAPI.dispatch(SetAppStatusAC({status: 'loading'}));
    try {
      const res = await TodolistApi.createTodo(title);
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(SetAppStatusAC({status: 'succeeded'}));
            return {todolist: res.data.data.item};
        } else {
            handleServerAppError(thunkAPI.dispatch, res.data);
            return thunkAPI.rejectWithValue(null);
        }
    } catch (err: any) {
        handleServerNetworkError(thunkAPI.dispatch, err.message);
        return thunkAPI.rejectWithValue(null);
    }
})

export const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle',async (param: {todolistId: string, title: string}, thunkAPI) => {
    thunkAPI.dispatch(SetAppStatusAC({status: 'loading'}));
    thunkAPI.dispatch(ChangeTodolistEntityStatusAC({id: param.todolistId, entityStatus: 'loading'}));
    try {
        const res = await TodolistApi.updateTodoTitle(param.todolistId, param.title);
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(SetAppStatusAC({status: 'succeeded'}));
            thunkAPI.dispatch(ChangeTodolistEntityStatusAC({id: param.todolistId, entityStatus: 'succeeded'}));
            return {id: param.todolistId, title: param.title};
        } else {
            handleServerAppError(thunkAPI.dispatch, res.data);
            return thunkAPI.rejectWithValue(null);
        }
    } catch (err: any) {
        handleServerNetworkError(thunkAPI.dispatch, err.message);
        return thunkAPI.rejectWithValue(null);
    }

})
