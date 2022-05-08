import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../../../../../components/EditableSpan/EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import {DeleteOutline} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../../../../../api/todolist-api";


type TaskPropsType = TaskType & {
    todolistID: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
}

const Task = React.memo((props: TaskPropsType) => {

    const removeTask = useCallback(() => props.removeTask(props.id, props.todolistID),
        [props.removeTask, props.id, props.todolistID]);

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistID);
    }, [props.changeTaskStatus, props.id ,props.todolistID]);

    const changeTaskTitle = useCallback((title: string) => props.changeTaskTitle(props.id, title, props.todolistID),
        [props.changeTaskTitle, props.id, props.todolistID]);

    return (
        <li style={{display: "flex", justifyContent: "space-between", fontWeight: 'bold'}}
            className={props.status === TaskStatuses.Completed ? 'task-completed' : ''}>
            <Checkbox
                onChange={changeTaskStatus}
                checked={props.status === TaskStatuses.Completed}
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