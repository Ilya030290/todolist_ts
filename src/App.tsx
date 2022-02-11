import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS/TS", isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (taskID: number) => {
        const filteredTasks = tasks.filter( task => task.id !== taskID)
        setTasks(filteredTasks)
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
                      removeTask={removeTask} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
