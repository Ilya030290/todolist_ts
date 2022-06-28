import {TodolistApi, TodoType} from "../../api/todolist-api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RequestStatusType, SetAppErrorAC, SetAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

//Types
export type ActionsType =
      ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof ChangeTodolistFilterAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof SetAppStatusAC>
    | ReturnType<typeof SetAppErrorAC>
    | ReturnType<typeof ChangeTodolistEntityStatusAC>

export type TodolistsDispatchType = ThunkDispatch<TodolistType[], unknown, ActionsType>
export type TodolistsThunkType = ThunkAction<void, TodolistType[], unknown, ActionsType>

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = TodoType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const slice = createSlice({
    name: "todolists",
    initialState: [] as Array<TodolistType>,
    reducers: {
        AddTodolistAC(state, action: PayloadAction<{todolist: TodoType}>) {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        ChangeTodolistFilterAC(state, action: PayloadAction<{id: string, filter: FilterValuesType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].filter = action.payload.filter;
        },
        ChangeTodolistTitleAC(state, action: PayloadAction<{id: string, title: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].title = action.payload.title;
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
    }
});

//Reducer
export const todolistsReducer = slice.reducer;
export const {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
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

export const addTodolistTC = (title: string): TodolistsThunkType => (dispatch: TodolistsDispatchType) => {
    dispatch(SetAppStatusAC({status: 'loading'}));
    TodolistApi.createTodo(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(AddTodolistAC({todolist: res.data.data.item}));
                dispatch(SetAppStatusAC({status: 'succeeded'}));
            } else {
                handleServerAppError(dispatch, res.data);
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message);
        })
}

export const changeTodolistTitleTC = (todolistId: string, title: string): TodolistsThunkType => (dispatch: TodolistsDispatchType) => {
    dispatch(SetAppStatusAC({status: 'loading'}));
    dispatch(ChangeTodolistEntityStatusAC({id: todolistId, entityStatus: 'loading'}));
    TodolistApi.updateTodoTitle(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(ChangeTodolistTitleAC({id: todolistId, title: title}));
                dispatch(SetAppStatusAC({status: 'succeeded'}));
                dispatch(ChangeTodolistEntityStatusAC({id: todolistId, entityStatus: 'succeeded'}));
            } else {
                handleServerAppError(dispatch, res.data);
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message);
        })
}
