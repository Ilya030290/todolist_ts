import {SetAppErrorAC, SetAppErrorAT, SetAppStatusAC, SetAppStatusAT} from "../app/app-reducer";
import {Dispatch} from "redux";
import {CommonResponseType} from "../api/todolist-api";


export const handleServerNetworkError = (dispatch: Dispatch<SetAppErrorAT | SetAppStatusAT>, message: string) => {
    dispatch(SetAppErrorAC(message));
    dispatch(SetAppStatusAC('failed'));
}

export const handleServerAppError = <T>(dispatch: Dispatch<SetAppErrorAT | SetAppStatusAT>, data: CommonResponseType<T>) => {
    dispatch(SetAppErrorAC(data.messages.length ? data.messages[0] : 'Some error occurred'));
    dispatch(SetAppStatusAC('failed'));
}