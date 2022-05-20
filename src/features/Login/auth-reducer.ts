import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {SetAppErrorAT, SetAppStatusAT, SetAppStatusAC} from "../../app/app-reducer";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState;
export type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusAT | SetAppErrorAT;
export type AuthDispatchType = ThunkDispatch<InitialStateType, unknown, ActionsType>;
export type AuthThunkType = ThunkAction<void, InitialStateType, unknown, ActionsType>;

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value};
        default:
            return state;
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const);

// thunks
export const loginTC = (data: LoginParamsType): AuthThunkType => (dispatch: AuthDispatchType) => {
    dispatch(SetAppStatusAC('loading'));
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(SetAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data);
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error);
        })
}



