import React from 'react';
import TodolistHeader from "./TodolistHeader";
import TasksList from "./TasksList";
import {FilterValuesType} from "./App";


type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (todolistID: string, taskID: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    removeTodolist: (todolistID: string) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

const Todolist = (props: TodolistPropsType) => {
    return (
            <div>
                <TodolistHeader
                    removeTodolist={props.removeTodolist}
                    todolistID={props.todolistID}
                    title={props.title}
                    addTask={props.addTask}
                    filter={props.filter}
                />
                <TasksList
                    todolistID={props.todolistID}
                    tasks={props.tasks}
                    removeTask={props.removeTask}
                    changeFilter={props.changeFilter}
                    filter={props.filter}
                    changeTaskStatus={props.changeTaskStatus}
                />
            </div>
    );
};

export default Todolist;