import React, {ChangeEvent, useState, KeyboardEvent, FC} from 'react';

type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = (props) => {
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
        setError(null)
        e.key === "Enter" && addItem()
    }

    const errorInputClass = error ? "error" : ""

    return (
        <div>
            <input
                onChange={onChangeHandler}
                value={title}
                onKeyPress={onKeyPressHandler}
                className={errorInputClass}
            />
            <button onClick={addItem}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};
