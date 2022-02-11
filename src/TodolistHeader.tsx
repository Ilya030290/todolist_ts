import React from 'react';
import AddTaskForm from "./AddTaskForm";

type TodolistHeaderPropsType = {
    title: string
}

const TodolistHeader = (props: TodolistHeaderPropsType) => {
    return (
        <>
            <h3>{props.title}</h3>
            <AddTaskForm />
        </>
    );
};

export default TodolistHeader;