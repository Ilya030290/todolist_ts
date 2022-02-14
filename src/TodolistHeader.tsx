import React from 'react';
import AddTaskForm from "./AddTaskForm";

type TodolistHeaderPropsType = {
    title: string,
    addTask: (title: string) => void
}

const TodolistHeader = (props: TodolistHeaderPropsType) => {
    return (
        <>
            <h3>{props.title}</h3>
            <AddTaskForm addTask={props.addTask}/>
        </>
    );
};

export default TodolistHeader;