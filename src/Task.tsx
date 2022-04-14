import {TaskType} from "./Todolist";
import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "./components/EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {DeleteOutline} from "@material-ui/icons";

type TaskPropsType = TaskType & {
    todolistID: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
}

const Task = React.memo((props: TaskPropsType) => {

    const removeTask = useCallback(() => props.removeTask(props.id, props.todolistID),
        [props.removeTask, props.id, props.todolistID]);

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.id, newIsDoneValue, props.todolistID);
    }, [props.changeTaskStatus, props.id ,props.todolistID]);

    const changeTaskTitle = useCallback((title: string) => props.changeTaskTitle(props.id, title, props.todolistID),
        [props.changeTaskTitle, props.id, props.todolistID]);

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
});


export default Task;