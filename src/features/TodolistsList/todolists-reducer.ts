import {TodolistApi, TodoType} from "../../api/todolist-api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RequestStatusType, SetAppErrorAC, SetAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//Types
export type ActionsType = ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof ChangeTodolistFilterAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof SetTodolistsAC>
    | ReturnType<typeof SetAppStatusAC>
    | ReturnType<typeof SetAppErrorAC>
    | ReturnType<typeof ChangeTodolistEntityStatusAC>

export type TodolistsDispatchType = ThunkDispatch<TodolistType[], unknown, ActionsType>
export type TodolistsThunkType = ThunkAction<void, TodolistType[], unknown, ActionsType>

const initialState: Array<TodolistType> = [];

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = TodoType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const slice = createSlice({
    name: "todolists",
    initialState: initialState,
    reducers: {
        RemoveTodolistAC(state, action: PayloadAction<{id: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            if (index > -1) {
                state.splice(index, 1);
            }
        },
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
        SetTodolistsAC(state, action: PayloadAction<{todos: TodoType[]}>) {
            return action.payload.todos.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
        },
        ChangeTodolistEntityStatusAC(state, action: PayloadAction<{id: string, entityStatus: RequestStatusType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].entityStatus = action.payload.entityStatus;
        }
    }
});

//Reducer
export const todolistsReducer = slice.reducer;
export const {
    RemoveTodolistAC,
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    SetTodolistsAC,
    ChangeTodolistEntityStatusAC
} = slice.actions;

//ThunkCreators
export const setTodolistsTC = (): TodolistsThunkType => (dispatch: TodolistsDispatchType) => {
    dispatch(SetAppStatusAC({status: 'loading'}));
    TodolistApi.getTodos()
        .then((res) => {
            dispatch(SetTodolistsAC({todos: res.data}));
            dispatch(SetAppStatusAC({status: 'succeeded'}));
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message);
        })
}

export const removeTodolistTC = (todolistId: string): TodolistsThunkType => (dispatch: TodolistsDispatchType) => {
    dispatch(SetAppStatusAC({status: 'loading'}));
    dispatch(ChangeTodolistEntityStatusAC({id: todolistId, entityStatus: 'loading'}));
    TodolistApi.deleteTodo(todolistId)
        .then((res) => {
            dispatch(RemoveTodolistAC({id: todolistId}));
            dispatch(SetAppStatusAC({status: 'succeeded'}));
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message);
        })
}

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
