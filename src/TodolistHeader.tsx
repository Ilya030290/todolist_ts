import React from 'react';
import AddTaskForm from "./AddTaskForm";
import {FilterValuesType} from "./App";
import {EditableSpan} from "./components/EditableSpan";

type TodolistHeaderPropsType = {
    title: string,
    filter: FilterValuesType,
    addTask: (todolistID: string, title: string) => void
    removeTodolist: (todolistID: string) => void
    todolistID: string
    changeTodolistTitle: (todolistID: string, title: string) => void
}

export const TodolistHeader = (props: TodolistHeaderPropsType) => {
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
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.todolistID, title)
    }

    return (
        <>
            <h3>
                <EditableSpan oldTitle={props.title} changeTitle={changeTodolistTitle}/>
                <button onClick={removeTodolistHandler}>x</button>
                <div className={"filter-header"}>{text}</div>
            </h3>
            <AddTaskForm
                addTask={props.addTask}
                todolistID={props.todolistID}
            />
        </>
    );
};

