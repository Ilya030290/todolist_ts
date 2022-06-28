import {addTaskTC, deleteTaskTC, setTasksTC, tasksReducer, TaskStateType, updateTaskTC} from './tasks-reducer';
import {AddTodolistAC, RemoveTodolistAC, setTodolistsTC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";



let startState: TaskStateType;

beforeEach(() => {

    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1",
                description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1",
                description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1",
                description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        "todolistId2": [
            {id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2",
                description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2",
                description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2",
                description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const action = deleteTaskTC.fulfilled({taskId: "2", todolistId: "todolistId2"}, 'requestId', {todolistId: "todolistId2", taskId: "2"});

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1",
                description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1",
                description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1",
                description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        "todolistId2": [
            {id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2",
                description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2",
                description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    });
})

test('correct task should be added to correct array', () => {

    const task = {id: "4", title: "juice", status: TaskStatuses.New, todoListId: "todolistId2",
        description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}

    const action = addTaskTC.fulfilled(task, "requestId", {taskTitle: task.title, todolistId: task.todoListId});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juice');
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})


test('status of specified task should be changed', () => {
    const updateModel = {taskId: "2", domainModel: {status: TaskStatuses.New}, todolistId: "todolistId2"}
    const action = updateTaskTC.fulfilled({taskId: "2", model: {status: TaskStatuses.New}, todolistId: "todolistId2"}, "requestId", updateModel);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});


test('title of specified task should be changed', () => {
    const updateModel = {taskId: "2", domainModel: {title: "beer"}, todolistId: "todolistId2"};
    const action = updateTaskTC.fulfilled({taskId: "2", model: {title: "beer"}, todolistId: "todolistId2"}, "requestId", updateModel);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("beer");
    expect(endState["todolistId1"][1].title).toBe("JS");
});


test('new array should be added when new todolist is added', () => {

    const action = AddTodolistAC({todolist: {id: "12345", title: "new todolist", addedDate: '', order: 0}});

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});


test('property with todolistId should be deleted', () => {

    const action = RemoveTodolistAC({id: "todolistId2"});

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('empty arrays should be added when we set todolists', () => {

    const action = setTodolistsTC.fulfilled({todos: [
            {id: "todolistID1", title: 'What to learn', addedDate: '', order: 0},
            {id: "todolistID2", title: 'What to buy', addedDate: '', order: 0}
        ]}, "requestId");

    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState["todolistID1"]).toStrictEqual([]);
    expect(endState["todolistID2"]).toStrictEqual([]);
});

test('tasks should be added for todolist', () => {

    const action = setTasksTC.fulfilled({todolistId: "todolistId1", tasks: startState["todolistId1"]}, 'requestId', 'todolistId1');

    const endState = tasksReducer({"todolistId2": [], "todolistId1": []}, action);

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);

});