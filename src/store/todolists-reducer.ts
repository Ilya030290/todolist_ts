import {TodolistApi, TodoType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistAT = {
    type: "ADD-TODOLIST"
    todolist: TodoType
}
export type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}
export type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}
export type SetTodolistsAT = ReturnType<typeof SetTodolistsAC>

export type ActionsType = RemoveTodolistAT
    | AddTodolistAT
    | ChangeTodolistFilterAT
    | ChangeTodolistTitleAT
    | SetTodolistsAT


const initialState: Array<TodolistType> = []

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = TodoType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.todos.map(tl => ({...tl, filter: 'all'}))
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodolist: TodolistType = {...action.todolist, filter: 'all'}
            return [newTodolist, ...state]
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        default:
            return state;
    }
}

export const RemoveTodolistAC = (id: string): RemoveTodolistAT => ({type: "REMOVE-TODOLIST", id: id})

export const AddTodolistAC = (todolist: TodoType): AddTodolistAT =>
    ({type: "ADD-TODOLIST", todolist})

export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterAT =>
    ({type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter})

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT =>
    ({type: "CHANGE-TODOLIST-TITLE", id: id, title: title})

export const SetTodolistsAC = (todos: TodoType[]) => ({type: "SET-TODOLISTS", todos} as const)


//ThunkCreators

export const setTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        TodolistApi.getTodos()
            .then((res) => {
                dispatch(SetTodolistsAC(res.data))
            })
    }
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        TodolistApi.deleteTodo(todolistId)
            .then((res) => {
                dispatch(RemoveTodolistAC(todolistId))
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        TodolistApi.createTodo(title)
            .then((res) => {
                dispatch(AddTodolistAC(res.data.data.item))
            })
    }
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        TodolistApi.updateTodoTitle(todolistId, title)
            .then((res) => {
                dispatch(ChangeTodolistTitleAC(todolistId, title))
            })
    }
}