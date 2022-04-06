import React from 'react';
import {TodolistHeader} from "./TodolistHeader";
import TasksList from "./TasksList";
import {FilterValuesType} from "./App";


type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (id: string, filter: FilterValuesType) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodolistTitle: (id: string, title: string) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

const Todolist = (props: TodolistPropsType) => {
    return (
            <div style={{width: "fit-content", textAlign: "center"}}>
                <TodolistHeader
                    removeTodolist={props.removeTodolist}
                    todolistID={props.todolistID}
                    title={props.title}
                    addTask={props.addTask}
                    filter={props.filter}
                    changeTodolistTitle={props.changeTodolistTitle}
                />
                <TasksList
                    todolistID={props.todolistID}
                    tasks={props.tasks}
                    removeTask={props.removeTask}
                    changeFilter={props.changeFilter}
                    filter={props.filter}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                />
            </div>
    );
};

export default Todolist;