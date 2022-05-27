import {SetAppErrorAC, SetAppErrorAT, SetAppStatusAC, SetAppStatusAT} from "../app/app-reducer";
import {Dispatch} from "redux";
import {CommonResponseType} from "../api/todolist-api";


export const handleServerNetworkError = (dispatch: Dispatch<SetAppErrorAT | SetAppStatusAT>, message: string) => {
    dispatch(SetAppErrorAC({error: message}));
    dispatch(SetAppStatusAC({status: 'failed'}));
}

export const handleServerAppError = <T>(dispatch: Dispatch<SetAppErrorAT | SetAppStatusAT>, data: CommonResponseType<T>) => {
    dispatch(SetAppErrorAC(data.messages.length ? {error: data.messages[0]} : {error: 'Some error occurred'}));
    dispatch(SetAppStatusAC({status: 'failed'}));
}