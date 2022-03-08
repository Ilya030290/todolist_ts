import React from 'react';
import {FilterValuesType} from "./App";


type ControlButtonsType = {
    todolistID: string
    filter: FilterValuesType,
    changeFilter: (todolistID: string, value: FilterValuesType) => void
}

const ControlButtons = (props: ControlButtonsType) => {

    const onAllClickSetFilter = () => props.changeFilter(props.todolistID, "all");
    const onActiveClickSetFilter = () => props.changeFilter(props.todolistID, "active");
    const onCompletedClickSetFilter = () => props.changeFilter(props.todolistID, "completed");

    return (
        <div>
            <button className={props.filter === "all" ? "button-active" : ""} onClick={onAllClickSetFilter}>All</button>
            <button className={props.filter === "active" ? "button-active" : ""} onClick={onActiveClickSetFilter}>Active</button>
            <button className={props.filter === "completed" ? "button-active" : ""} onClick={onCompletedClickSetFilter}>Completed</button>
        </div>
    );
};

export default ControlButtons;