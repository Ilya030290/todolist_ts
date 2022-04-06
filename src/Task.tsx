import {TaskType} from "./Todolist";
import React, {ChangeEvent} from "react";
import {EditableSpan} from "./components/EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {DeleteOutline} from "@material-ui/icons";

type TaskPropsType = TaskType & {
    todolistID: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
}

const Task = (props: TaskPropsType) => {

    const removeTask = () => props.removeTask(props.id, props.todolistID);

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(props.id, e.currentTarget.checked ,props.todolistID);

    const changeTaskTitle = (title: string) => props.changeTaskTitle(props.id, title, props.todolistID,);

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