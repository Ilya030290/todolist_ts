import {TaskType} from "./Todolist";
import React, {ChangeEvent} from "react";
import {EditableSpan} from "./components/EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {DeleteOutline} from "@material-ui/icons";

type TaskPropsType = TaskType & {
    todolistID: string
    removeTask: (todolistID: string, taskID: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    changeTaskTitle: (todolistID: string, taskID: string, title: string) => void
}

const Task = (props: TaskPropsType) => {

    const removeTask = () => props.removeTask(props.todolistID, props.id);

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(props.todolistID, props.id, e.currentTarget.checked);

    const changeTaskTitle = (title: string) => props.changeTaskTitle(props.todolistID, props.id, title);

    return (
        <li style={{display: "flex", justifyContent: "space-between", fontWeight: 'bold'}}
            className={props.isDone ? 'task-completed' : ''}>
            <Checkbox
                onChange={changeTaskStatus}
                checked={props.isDone}
                size={'small'}
            />
            <EditableSpan
                oldTitle={props.title}
                changeTitle={changeTaskTitle}
            />
            <IconButton onClick={removeTask} color={'secondary'} size={'small'}>
                <DeleteOutline fontSize={'small'}/>
            </IconButton>
        </li>
    );
};


export default Task;