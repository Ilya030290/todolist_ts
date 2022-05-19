import { Dispatch } from 'redux'
import {SetAppErrorAC, SetAppStatusAC} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {handleServerAppError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: LoginActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(SetAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
}

// types
type LoginActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusAT | SetAppErrorAT;
type SetAppStatusAT = ReturnType<typeof SetAppStatusAC>;
type SetAppErrorAT = ReturnType<typeof SetAppErrorAC>;
