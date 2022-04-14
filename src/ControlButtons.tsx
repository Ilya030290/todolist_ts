import React, {useCallback} from 'react';
import {FilterValuesType} from "./App";
import {Button} from "@material-ui/core";


type ControlButtonsType = {
    todolistID: string
    filter: FilterValuesType,
    changeFilter: (id: string, filter: FilterValuesType) => void
}

const ControlButtons = React.memo((props: ControlButtonsType) => {

    const onAllClickSetFilter = useCallback(() => props.changeFilter(props.todolistID, "all"), [props.changeFilter, props.todolistID]);
    const onActiveClickSetFilter = useCallback(() => props.changeFilter(props.todolistID, "active"), [props.changeFilter, props.todolistID]);
    const onCompletedClickSetFilter = useCallback(() => props.changeFilter(props.todolistID, "completed"), [props.changeFilter, props.todolistID]);

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
});

export default ControlButtons;