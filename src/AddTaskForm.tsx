import React, {ChangeEvent, useState, KeyboardEvent, CSSProperties} from 'react';
import {Button, IconButton, TextField} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import {ControlPoint} from "@material-ui/icons";

type AddTaskFormPropsType = {
    addTask: (todolistID: string, title: string) => void
    todolistID: string
}

const AddTaskForm = (props: AddTaskFormPropsType) => {

    const [title, setTitle] = useState<string>("")
    const[error, setError] = useState<boolean>(false)

    const onClickAddTask = () => {

        const trimmedTitle = title.trim()
        if (trimmedTitle !== "") {
            props.addTask(props.todolistID, trimmedTitle)
            setTitle("")
        } else {
            setError(true)
        }
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressSetTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        e.key === "Enter" && onClickAddTask()
    }

    return (
        <div>
            <TextField
                variant={"outlined"}
                value={title}
                onChange={onChangeSetTitle}
                onKeyPress={onKeyPressSetTitle}
                size={"small"}
                label={"Title"}
                error={!!error}
                helperText={!!error && "Please enter the text!"}
            />
            <IconButton color={'primary'} onClick={onClickAddTask} size={'medium'}>
                <ControlPoint/>
            </IconButton>
        </div>
    );
};

export default AddTaskForm;