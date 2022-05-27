import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {SetAppErrorAT, SetAppStatusAT, SetAppStatusAC} from "../../app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState;
export type AuthDispatchType = ThunkDispatch<InitialStateType, unknown, ReturnType<typeof setIsLoggedInAC> | SetAppStatusAT | SetAppErrorAT>;
export type AuthThunkType = ThunkAction<void, InitialStateType, unknown, ReturnType<typeof setIsLoggedInAC> | SetAppStatusAT | SetAppErrorAT>;

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>) {
            state.isLoggedIn = action.payload.value;
        }
    }
});

export const authReducer = slice.reducer;
export const setIsLoggedInAC = slice.actions.setIsLoggedInAC;

// thunks
export const loginTC = (data: LoginParamsType): AuthThunkType => (dispatch: AuthDispatchType) => {
    dispatch(SetAppStatusAC('loading'));
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}));
                dispatch(SetAppStatusAC('succeeded'));
            } else {
                handleServerAppError(dispatch, res.data);
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error);
        })
}

export const logoutTC = (): AuthThunkType => (dispatch: AuthDispatchType) => {
    dispatch(SetAppStatusAC('loading'));
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}));
                dispatch(SetAppStatusAC('succeeded'));
            } else {
                handleServerAppError(dispatch, res.data);
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error);
        })
}



