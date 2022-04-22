import React from 'react';
import Task from "./Task";
import {TaskType} from "./Todolist";
import ControlButtons from "./ControlButtons";
import {FilterValuesType} from "./App";
import {List} from "@mui/material";





type TasksListPropsType = {
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (id: string, filter: FilterValuesType) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    todolistID: string
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
};

const TasksList = React.memo((props: TasksListPropsType) => {

    const tasksComponentsList = props.tasks.map( task => {
        return <Task
            key={task.id} {...task}
            removeTask={props.removeTask}
            changeTaskStatus={props.changeTaskStatus}
            todolistID={props.todolistID}
            changeTaskTitle={props.changeTaskTitle}
        />
    });

    const emptyMessage = <span style={{fontSize: "10px"}}>Tasks list with this filter is empty. Please add task</span>

    const tasksList = tasksComponentsList.length
        ?
        <List>
            {tasksComponentsList}
        </List>
        :
        emptyMessage
    return (
        <>
            <List>
            {tasksList}
            </List>
            <ControlButtons
                todolistID={props.todolistID}
                changeFilter={props.changeFilter}
                filter={props.filter}
            />
        </>
    );
});

export default TasksList;