import React from 'react';
import AddTaskForm from "./AddTaskForm";
import {FilterValuesType} from "./App";

type TodolistHeaderPropsType = {
    title: string,
    filter: FilterValuesType,
    addTask: (title: string) => void
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

    return (
        <>
            <h3>{props.title}<div className={"filter-header"}>{text}</div></h3>
            <AddTaskForm addTask={props.addTask}/>
        </>
    );
};

export default TodolistHeader;