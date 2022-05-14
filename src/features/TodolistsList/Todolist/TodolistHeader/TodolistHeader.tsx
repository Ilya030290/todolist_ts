import React, {useCallback} from 'react';
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {AddItemForm} from "../../../../components/AddItemForm/AddItemForm";
import {IconButton} from "@mui/material";
import {DeleteOutline} from "@mui/icons-material";
import {TodolistType} from "../../todolists-reducer";


type TodolistHeaderPropsType = {
    todolist: TodolistType
    addTask: (title: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, title: string) => void
}

export const TodolistHeader = React.memo((props: TodolistHeaderPropsType) => {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id);
    }, [props.addTask, props.todolist.id]);

    const removeTodolistHandler = useCallback(() => {
        props.removeTodolist(props.todolist.id)
    },[props.removeTodolist, props.todolist.id]);

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolist.id, title)
    }, [props.changeTodolistTitle, props.todolist.id]);

    return (
        <>
            <h3>
                <EditableSpan
                    oldTitle={props.todolist.title}
                    changeTitle={changeTodolistTitle}
                    disabled={props.todolist.entityStatus === 'loading'}
                />
                <IconButton onClick={removeTodolistHandler} color={'secondary'} size={'small'} disabled={props.todolist.entityStatus === 'loading'}>
                    <DeleteOutline fontSize={'small'}/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
        </>
    );
});

