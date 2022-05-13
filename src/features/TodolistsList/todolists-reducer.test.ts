import {v1} from "uuid";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, FilterValuesType,
    RemoveTodolistAC, SetTodolistsAC,
    todolistsReducer,
    TodolistType
} from "./todolists-reducer";
import {TodoType} from "../../api/todolist-api";

let todolistID1: string;
let todolistID2: string;
let startState: Array<TodolistType>;

beforeEach(() => {
    todolistID1 = v1();
    todolistID2 = v1();

    startState = [
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]
})

test('correct todolist should be removed', () => {

    const endState: Array<TodolistType> = todolistsReducer(startState, RemoveTodolistAC(todolistID1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);
});


test('correct todolist should be added', () => {

    let newTodolist: TodoType = {title: "New Todolist", id: "any id", addedDate: "", order: 0};

    const endState: Array<TodolistType> = todolistsReducer(startState, AddTodolistAC(newTodolist))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("New Todolist");
});


test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const endState: Array<TodolistType> = todolistsReducer(startState, ChangeTodolistFilterAC(todolistID2, newFilter))

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


test('correct todolist should change his name', () => {

    let newTodolistTitle = "New Todolist";

    const endState: Array<TodolistType> = todolistsReducer(startState, ChangeTodolistTitleAC(todolistID2, newTodolistTitle))

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('todolists should be set to the state', () => {

    const endState: Array<TodolistType> = todolistsReducer([], SetTodolistsAC(startState))

    expect(endState.length).toBe(2);
});