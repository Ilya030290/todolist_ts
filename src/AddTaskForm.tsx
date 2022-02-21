import React, {ChangeEvent, useState, KeyboardEvent, CSSProperties} from 'react';

type AddTaskFormPropsType = {
    addTask: (title: string) => void
}

const AddTaskForm = (props: AddTaskFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const[error, setError] = useState<boolean>(false)

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressSetTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && onClickAddTask()
    }
    const errorMessageStyle : CSSProperties = {backgroundColor: "red", color: "white", textAlign: "center"}
    const errorMessage = error && <div style={errorMessageStyle}>Title is require!</div>
    const errorInputClass = error ? "error" : ""

    return (
        <div>
            <input onChange={onChangeSetTitle} value={title} onKeyPress={onKeyPressSetTitle} className={errorInputClass}/>
            <button onClick={onClickAddTask}>+</button>
            {errorMessage}
        </div>
    );
};

export default AddTaskForm;