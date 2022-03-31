import {FilterValuesType, todolistsType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type AddTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
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

export type ActionsType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT

export const todolistsReducer = (state: Array<todolistsType>, action: ActionsType): Array<todolistsType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [{ id: action.todolistId, title: action.title, filter: "all"}, ...state]
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        default:
            return state
    }
}

export const RemoveTodolistAC = (id: string): RemoveTodolistAT => ({type: "REMOVE-TODOLIST", id: id})

export const AddTodolistAC = (title: string): AddTodolistAT => ({type: "ADD-TODOLIST", title: title, todolistId: v1()})

export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterAT =>
    ({type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter})

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT =>
    ({type: "CHANGE-TODOLIST-TITLE", id: id ,title: title})