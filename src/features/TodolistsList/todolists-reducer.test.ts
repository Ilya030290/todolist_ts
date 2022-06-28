import {v1} from "uuid";
import {
    AddTodolistAC, ChangeTodolistEntityStatusAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, FilterValuesType,
    RemoveTodolistAC, setTodolistsTC,
    todolistsReducer,
    TodolistType
} from "./todolists-reducer";
import {TodoType} from "../../api/todolist-api";
import {RequestStatusType} from "../../app/app-reducer";

let todolistID1: string;
let todolistID2: string;
let startState: Array<TodolistType>;

beforeEach(() => {
    todolistID1 = v1();
    todolistID2 = v1();

    startState = [
        {id: todolistID1, title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistID2, title: 'What to buy', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0}
    ]
})

test('correct todolist should be removed', () => {

    const endState: Array<TodolistType> = todolistsReducer(startState, RemoveTodolistAC({id: todolistID1}))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);
});


test('correct todolist should be added', () => {

    let newTodolist: TodoType = {title: "New Todolist", id: "any id", addedDate: "", order: 0};

    const endState: Array<TodolistType> = todolistsReducer(startState, AddTodolistAC({todolist: newTodolist}))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("New Todolist");
});


test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const endState: Array<TodolistType> = todolistsReducer(startState, ChangeTodolistFilterAC({id: todolistID2, filter: newFilter}))

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


test('correct todolist should change his name', () => {

    let newTodolistTitle = "New Todolist";

    const endState: Array<TodolistType> = todolistsReducer(startState, ChangeTodolistTitleAC({id: todolistID2, title: newTodolistTitle}))

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('todolists should be set to the state', () => {

    const endState: Array<TodolistType> = todolistsReducer([], setTodolistsTC.fulfilled({todos: startState}, "requestId"))

    expect(endState.length).toBe(2);
});


test('correct entity status of todolist should be changed', () => {

    let newStatus: RequestStatusType = "loading";

    const endState = todolistsReducer(startState, ChangeTodolistEntityStatusAC({id: todolistID2, entityStatus: newStatus}))

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newStatus);
});