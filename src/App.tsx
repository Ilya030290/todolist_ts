import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (taskID: string) => {
        const filteredTasks = tasks.filter( task => task.id !== taskID)
        setTasks(filteredTasks)
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(), title: title, isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const changeFilter = (filter: "all" | "active" | "completed") => {
        setFilter(filter)
    }

    const getFilteredTasksForRender = () => {
        switch (filter) {
            case "completed":
                return tasks.filter( t => t.isDone === true)
            case "active":
                return tasks.filter( t => t.isDone === false)
            default:
                return tasks
        }
    }
    const filteredTasksForRender = getFilteredTasksForRender()

    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={filteredTasksForRender}
                      removeTask={removeTask} changeFilter={changeFilter} addTask={addTask}/>
        </div>
    );
}

export default App;
