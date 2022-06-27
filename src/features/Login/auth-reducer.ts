import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {SetAppErrorAT, SetAppStatusAT, SetAppStatusAC} from "../../app/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

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
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value;
        }
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state) => {
            state.isLoggedIn = true;
        })
        builder.addCase(logoutTC.fulfilled, (state) => {
            state.isLoggedIn = false;
        })
    }
});

export const authReducer = slice.reducer;
export const setIsLoggedInAC = slice.actions.setIsLoggedInAC;

// thunks
export const loginTC = createAsyncThunk('auth/login', async (param: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(SetAppStatusAC({status: 'loading'}));
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(SetAppStatusAC({status: 'succeeded'}));
        } else {
            handleServerAppError(thunkAPI.dispatch, res.data);
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors});
        }
    } catch (err: any) {
        handleServerNetworkError(thunkAPI.dispatch, err);
        return thunkAPI.rejectWithValue({errors: [err.message], fieldsErrors: undefined});
    }
})

export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(SetAppStatusAC({status: 'loading'}));
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(SetAppStatusAC({status: 'succeeded'}));
        } else {
            handleServerAppError(thunkAPI.dispatch, res.data);
            thunkAPI.rejectWithValue({});
        }
    } catch (err: any) {
        handleServerNetworkError(thunkAPI.dispatch, err);
        thunkAPI.rejectWithValue({});
    }
})



