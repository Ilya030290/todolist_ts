import {v1} from "uuid";
import {FilterValuesType, todolistsType} from "../App";
import {AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer} from "./todolists-reducer";

test('correct todolist should be removed', () => {
    let todolistID1: string = v1();
    let todolistID2: string = v1();

    const startState: Array<todolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]

    const endState: Array<todolistsType> = todolistsReducer(startState, RemoveTodolistAC(todolistID1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);
});


test('correct todolist should be added', () => {
    let todolistID1: string = v1();
    let todolistID2: string = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<todolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]

    const endState: Array<todolistsType> = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {
    let todolistID1: string = v1();
    let todolistID2: string = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<todolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]

    const endState: Array<todolistsType> = todolistsReducer(startState, ChangeTodolistFilterAC(todolistID2, newFilter))

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


test('correct todolist should change his name', () => {
    let todolistID1: string = v1();
    let todolistID2: string = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<todolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]

    const endState: Array<todolistsType> = todolistsReducer(startState, ChangeTodolistTitleAC(todolistID2, newTodolistTitle))

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});