import {FilterValuesType, todolistsType} from "../App";
import {v1} from "uuid";

type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

type AddTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
}

type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}

type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}

export type ActionsType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT

export const todolistsReducer = (todolists: Array<todolistsType>, action: ActionsType): Array<todolistsType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodolistId = v1()
            return [{ id: newTodolistId, title: action.title, filter: "all"}, ...todolists]
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        default:
            return todolists
    }
}

export const RemoveTodolistAC = (id: string): RemoveTodolistAT => ({type: "REMOVE-TODOLIST", id: id})

export const AddTodolistAC = (title: string): AddTodolistAT => ({type: "ADD-TODOLIST", title: title})

export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterAT =>
    ({type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter})

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT =>
    ({type: "CHANGE-TODOLIST-TITLE", id: id ,title: title})