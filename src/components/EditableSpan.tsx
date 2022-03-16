import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    oldTitle: string
    changeTitle: (title:string)=>void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(props.oldTitle)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onDoubleClickHandler=()=>{
        setEdit(true)
    }
    const onBlurHandler=()=>{
        props.changeTitle(newTitle)
        setEdit(false)
    }
    return (
        edit
            ? <TextField
                label={"Please enter the text"}
                placeholder={"Placeholder"}
                value={newTitle}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                autoFocus
            />
            : <span onDoubleClick={onDoubleClickHandler}>
                {props.oldTitle}
            </span>
    );
};