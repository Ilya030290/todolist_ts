import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {ThunkAction, ThunkDispatch} from "redux-thunk";

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

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status};
        case "APP/SET-ERROR":
            return {...state, error: action.error};
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized};
        default:
            return state
    }
}

export const SetAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);
export const SetAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);
export const SetAppIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const);

//ThunkCreator
export const initializeAppTC = (): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(SetAppStatusAC('loading'));
    authAPI.me()
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
        .finally(() => {
            dispatch(SetAppIsInitializedAC(true));
        })
}

