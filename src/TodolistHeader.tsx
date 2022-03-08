import React from 'react';
import AddTaskForm from "./AddTaskForm";
import {FilterValuesType} from "./App";

type TodolistHeaderPropsType = {
    title: string,
    filter: FilterValuesType,
    addTask: (todolistID: string, title: string) => void
    removeTodolist: (todolistID: string) => void
    todolistID: string
}

const TodolistHeader = (props: TodolistHeaderPropsType) => {
    let text = "all"
    switch (props.filter) {
        case "active":
            text = "act"
            break
        case "completed":
            text = "comp"
            break
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }

    return (
        <>
            <h3>{props.title}<button onClick={removeTodolistHandler}>x</button>
                <div className={"filter-header"}>{text}</div>
            </h3>
            <AddTaskForm
                addTask={props.addTask}
                todolistID={props.todolistID}
            />
        </>
    );
};

export default TodolistHeader;