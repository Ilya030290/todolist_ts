import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type AddTaskFormPropsType = {
    addTask: (title: string) => void
}

const AddTaskForm = (props: AddTaskFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const onClickAddTask = () => {
        props.addTask(title)
        setTitle("")
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressSetTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && onClickAddTask()
    }
    return (
        <div>
            <input onChange={onChangeSetTitle} value={title} onKeyPress={onKeyPressSetTitle}/>
            <button onClick={onClickAddTask}>+</button>
        </div>
    );
};

export default AddTaskForm;