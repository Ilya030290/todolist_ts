import {TaskType} from "./Todolist";
import React, {ChangeEvent} from "react";
import {EditableSpan} from "./components/EditableSpan";

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
        <li>
            <input type="checkbox"
                   onChange={changeTaskStatus}
                   checked={props.isDone}
            />
            <EditableSpan
                oldTitle={props.title}
                changeTitle={changeTaskTitle}
            />
            <button onClick={removeTask}>x</button>
        </li>
    );
};


export default Task;