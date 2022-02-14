import React from 'react';
import {FilterValuesType} from "./App";

type ControlButtonsType = {
    changeFilter: (filter: FilterValuesType) => void
}

const ControlButtons = (props: ControlButtonsType) => {
    const onClickSetFilter = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter)
    }
    return (
        <div>
            <button onClick={onClickSetFilter('all')}>All</button>
            <button onClick={onClickSetFilter('active')}>Active</button>
            <button onClick={onClickSetFilter('completed')}>Completed</button>
        </div>
    );
};

export default ControlButtons;