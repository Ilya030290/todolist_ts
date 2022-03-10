import React, {ChangeEvent, useState} from 'react';

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
            ? <input
                value={newTitle}
                onChange={onChangeHandler}
                autoFocus
                onBlur={onBlurHandler}/>
            : <span
                onDoubleClick={onDoubleClickHandler}>
                {props.oldTitle}
            </span>
    );
};