import React, {ChangeEvent, useState, KeyboardEvent, FC} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> =  React.memo((props) => {

    const [title, setTitle] = useState<string>("")
    const[error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addItem = () => {
        const newTitle = title.trim()
        if (newTitle !== "") {
            props.addItem(newTitle)
            setTitle("")
        } else {
            setError("Title is required")
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
       if (error) setError(null)
        if (e.key === "Enter") {
            addItem()
        }
    }

    return (
        <div>
            <TextField
                variant={"outlined"}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                size={"small"}
                label={"Title"}
                error={!!error}
                helperText={!!error && "Please enter the text!"}
            />
            <IconButton color={'primary'} onClick={addItem}>
                <ControlPoint/>
            </IconButton>
        </div>
    );
});
