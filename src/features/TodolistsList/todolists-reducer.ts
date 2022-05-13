import {TodolistApi, TodoType} from "../../api/todolist-api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {SetAppStatusAC} from "../../app/app-reducer";

//Types
export type ActionsType = ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof ChangeTodolistFilterAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof SetTodolistsAC>
    | ReturnType<typeof SetAppStatusAC>

export type TodolistsDispatchType = ThunkDispatch<TodolistType[], unknown, ActionsType>
export type TodolistsThunkType = ThunkAction<void, TodolistType[], unknown, ActionsType>

const initialState: Array<TodolistType> = [];

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = TodoType & {
    filter: FilterValuesType
}

//Reducer
export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.todos.map(tl => ({...tl, filter: 'all'}));
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id);
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: 'all'}, ...state];
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
        default:
            return state;
    }
}

//ActionCreators
export const RemoveTodolistAC = (id: string) =>
    ({type: "REMOVE-TODOLIST", id} as const);

export const AddTodolistAC = (todolist: TodoType) =>
    ({type: "ADD-TODOLIST", todolist} as const);

export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: "CHANGE-TODOLIST-FILTER", id, filter} as const);

export const ChangeTodolistTitleAC = (id: string, title: string) =>
    ({type: "CHANGE-TODOLIST-TITLE", id, title} as const);

export const SetTodolistsAC = (todos: TodoType[]) =>
    ({type: "SET-TODOLISTS", todos} as const);

//ThunkCreators
export const setTodolistsTC = (): TodolistsThunkType => (dispatch: TodolistsDispatchType) => {
    dispatch(SetAppStatusAC('loading'));
    TodolistApi.getTodos()
        .then((res) => {
            dispatch(SetTodolistsAC(res.data));
            dispatch(SetAppStatusAC('succeeded'));
        })
}

export const removeTodolistTC = (todolistId: string): TodolistsThunkType => (dispatch: TodolistsDispatchType) => {
    dispatch(SetAppStatusAC('loading'));
    TodolistApi.deleteTodo(todolistId)
        .then((res) => {
            dispatch(RemoveTodolistAC(todolistId));
            dispatch(SetAppStatusAC('succeeded'));
        })
}

export const addTodolistTC = (title: string): TodolistsThunkType => (dispatch: TodolistsDispatchType) => {
    dispatch(SetAppStatusAC('loading'));
    TodolistApi.createTodo(title)
        .then((res) => {
            dispatch(AddTodolistAC(res.data.data.item));
            dispatch(SetAppStatusAC('succeeded'));
        })
}

export const changeTodolistTitleTC = (todolistId: string, title: string): TodolistsThunkType => (dispatch: TodolistsDispatchType) => {
    dispatch(SetAppStatusAC('loading'));
    TodolistApi.updateTodoTitle(todolistId, title)
        .then((res) => {
            dispatch(ChangeTodolistTitleAC(todolistId, title));
            dispatch(SetAppStatusAC('succeeded'));
        })
}
