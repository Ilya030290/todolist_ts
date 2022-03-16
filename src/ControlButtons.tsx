import React from 'react';
import {FilterValuesType} from "./App";
import {Button} from "@material-ui/core";


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
            <Button
                color={props.filter === 'all' ? "secondary" : "primary"}
                style={{margin: "5px"}}
                size={'small'}
                variant={'contained'}
                onClick={onAllClickSetFilter}>All
            </Button>
            <Button
                color={props.filter === 'active' ? "secondary" : "primary"}
                style={{margin: "5px"}}
                size={'small'}
                variant={'contained'}
                onClick={onActiveClickSetFilter}>Active
            </Button>
            <Button
                color={props.filter === 'completed' ? "secondary" : "primary"}
                style={{margin: "5px"}}
                size={'small'}
                variant={'contained'}
                onClick={onCompletedClickSetFilter}>Completed
            </Button>
        </div>
    );
};

export default ControlButtons;