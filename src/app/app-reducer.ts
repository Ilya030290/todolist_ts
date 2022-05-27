import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type AppActionsType = SetAppErrorAT | SetAppStatusAT | SetAppIsInitializedAT;
export type SetAppErrorAT = ReturnType<typeof SetAppErrorAC>;
export type SetAppStatusAT = ReturnType<typeof SetAppStatusAC>;
export type SetAppIsInitializedAT = ReturnType<typeof SetAppIsInitializedAC>;

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

export type InitialStateType = typeof initialState;
export type AppDispatchType = ThunkDispatch<InitialStateType, unknown, AppActionsType | ReturnType<typeof setIsLoggedInAC>>;
export type AppThunkType = ThunkAction<void, InitialStateType, unknown, AppActionsType>;

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        SetAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status;
        },
        SetAppErrorAC(state, action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error;
        },
        SetAppIsInitializedAC(state, action: PayloadAction<{isInitialized: boolean}>) {
            state.isInitialized = action.payload.isInitialized;
        }
    }
});

export const appReducer = slice.reducer;
export const {SetAppStatusAC, SetAppErrorAC, SetAppIsInitializedAC} = slice.actions;

//ThunkCreator
export const initializeAppTC = (): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(SetAppStatusAC({status: 'loading'}));
    authAPI.me()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}));
                dispatch(SetAppStatusAC({status: 'succeeded'}));
            } else {
                handleServerAppError(dispatch, res.data);
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error);
        })
        .finally(() => {
            dispatch(SetAppIsInitializedAC({isInitialized: true}));
        })
}

