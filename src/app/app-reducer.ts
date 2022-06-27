import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {ThunkAction} from "redux-thunk";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type AppActionsType = SetAppErrorAT | SetAppStatusAT;
export type SetAppErrorAT = ReturnType<typeof SetAppErrorAC>;
export type SetAppStatusAT = ReturnType<typeof SetAppStatusAC>;


const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

export type InitialStateType = typeof initialState;
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
        }
    },
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isInitialized = true;
        })
    }
});

export const appReducer = slice.reducer;
export const {SetAppStatusAC, SetAppErrorAC} = slice.actions;

//ThunkCreator
export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, thunkAPI) => {
    thunkAPI.dispatch(SetAppStatusAC({status: 'loading'}));
    try {
        const res = await authAPI.me();
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedInAC({value: true}));
            thunkAPI.dispatch(SetAppStatusAC({status: 'succeeded'}));
        } else {
            handleServerAppError(thunkAPI.dispatch, res.data);
        }
    } catch (err: any) {
            handleServerNetworkError(thunkAPI.dispatch, err);
        }
})

