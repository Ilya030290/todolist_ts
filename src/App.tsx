import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type todolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Computer", isDone: false},
            {id: v1(), title: "IPhone", isDone: false},
        ]
    });

    const removeTask = (todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskID)})
    }

    const addTask = (todolistID: string, title: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, isDone} : t)})
    }

    const changeFilter = (todolistID: string, value: FilterValuesType) => {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
    }

    const addNewTodolist = (newTodolistTitle: string) => {
        const newTodolistId = v1()
        setTodolists([{ id: newTodolistId, title: newTodolistTitle, filter: "all"}, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }

    const todolistsComponents = todolists.map((el) => {
        let tasksForTodolist = tasks[el.id];

        if (el.filter === "active") {
            tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
        }
        if (el.filter === "completed") {
            tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
        }
        return (
            <Todolist
                key={el.id}
                todolistID={el.id}
                title={el.title}
                tasks={tasksForTodolist}
                filter={el.filter}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodolist={removeTodolist}
            />
        )
    })

    return (
            <div className="App">
                <AddItemForm addItem={addNewTodolist} />
                {todolistsComponents}
            </div>
    );
}

export default App;
