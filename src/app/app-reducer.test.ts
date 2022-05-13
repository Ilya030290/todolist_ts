import {appReducer, InitialStateType, SetAppErrorAC, SetAppStatusAC} from "./app-reducer";

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null
    }
})

test('correct error message should be set', () => {

    const endState = appReducer(startState, SetAppErrorAC('some error'));

    expect(endState.error).toBe('some error');
})

test('correct status should be set', () => {

    const endState = appReducer(startState, SetAppStatusAC('loading'));

    expect(endState.status).toBe('loading');
})