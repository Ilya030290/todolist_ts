import React, {useCallback} from 'react';
import {FilterValuesType} from "./App";
import {EditableSpan} from "./components/EditableSpan";
import {DeleteOutline} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import {AddItemForm} from "./components/AddItemForm";

type TodolistHeaderPropsType = {
    title: string,
    filter: FilterValuesType,
    addTask: (title: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    todolistID: string
    changeTodolistTitle: (id: string, title: string) => void
}

export const TodolistHeader = React.memo((props: TodolistHeaderPropsType) => {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolistID);
    }, [props.addTask, props.todolistID]);

    const removeTodolistHandler = useCallback(() => {
        props.removeTodolist(props.todolistID)
    },[props.removeTodolist, props.todolistID]);

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolistID, title)
    }, [props.changeTodolistTitle, props.todolistID]);

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
            <AddItemForm addItem={addTask}/>
        </>
    );
});

