import React from 'react';
import AddTaskForm from "./AddTaskForm";
import {FilterValuesType} from "./App";
import {EditableSpan} from "./components/EditableSpan";
import {DeleteOutline} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";

type TodolistHeaderPropsType = {
    title: string,
    filter: FilterValuesType,
    addTask: (title: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    todolistID: string
    changeTodolistTitle: (id: string, title: string) => void
}

export const TodolistHeader = (props: TodolistHeaderPropsType) => {

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.todolistID, title)
    }

    return (
        <>
            <h3>
                <EditableSpan
                    oldTitle={props.title}
                    changeTitle={changeTodolistTitle}
                />
                <IconButton onClick={removeTodolistHandler} color={'secondary'} size={'small'}>
                    <DeleteOutline fontSize={'small'}/>
                </IconButton>
            </h3>
            <AddTaskForm
                addTask={props.addTask}
                todolistID={props.todolistID}
            />
        </>
    );
};

