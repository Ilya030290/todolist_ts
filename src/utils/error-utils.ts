import {AppActionsType, SetAppErrorAC, SetAppStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {CommonResponseType} from "../api/todolist-api";

export const handleServerNetworkError = (dispatch: Dispatch<AppActionsType>, message: string) => {
    dispatch(SetAppErrorAC(message));
    dispatch(SetAppStatusAC('failed'));
}

export const handleServerAppError = <T>(dispatch: Dispatch<AppActionsType>, data: CommonResponseType<T>) => {
    dispatch(SetAppErrorAC(data.messages.length ? data.messages[0] : 'Some error occurred'));
    dispatch(SetAppStatusAC('failed'));
}