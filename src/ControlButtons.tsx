import React from 'react';
import {FilterValuesType} from "./App";


type ControlButtonsType = {
    filter: FilterValuesType,
    changeFilter: (filter: FilterValuesType) => void
}

const ControlButtons = (props: ControlButtonsType) => {
    const onClickSetFilter = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter)
    }
    return (
        <div>
            <button className={props.filter === "all" ? "button-active" : ""} onClick={onClickSetFilter('all')}>All</button>
            <button className={props.filter === "active" ? "button-active" : ""} onClick={onClickSetFilter('active')}>Active</button>
            <button className={props.filter === "completed" ? "button-active" : ""} onClick={onClickSetFilter('completed')}>Completed</button>
        </div>
    );
};

export default ControlButtons;