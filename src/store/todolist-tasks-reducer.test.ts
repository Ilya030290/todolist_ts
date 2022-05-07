import {TaskStateType} from "../App";
import {tasksReducer} from "./tasks-reducer";
import {AddTodolistAC, todolistsReducer, TodolistType} from "./todolists-reducer";
import {TodoType} from "../api/todolist-api";


test('ids should be equals', () => {

    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodolistType> = [];

    let newTodolist: TodoType = {title: "new todolist", id: "id1234", addedDate: "", order: 0};

    const action = AddTodolistAC(newTodolist);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});