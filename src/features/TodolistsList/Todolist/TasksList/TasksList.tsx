import React from 'react';
import Task from "./Task/Task";
import ControlButtons from "./ControlButtons/ControlButtons";
import {List} from "@mui/material";
import {TaskStatuses, TaskType} from "../../../../api/todolist-api";
import {FilterValuesType, TodolistType} from "../../todolists-reducer";

type TasksListPropsType = {
    todolist: TodolistType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (id: string, filter: FilterValuesType) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
};

const TasksList = React.memo((props: TasksListPropsType) => {

    const tasksComponentsList = props.tasks.map( task => {
        return <Task
            key={task.id} {...task}
            removeTask={props.removeTask}
            changeTaskStatus={props.changeTaskStatus}
            todolistID={props.todolist.id}
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
                todolistID={props.todolist.id}
                changeFilter={props.changeFilter}
                filter={props.todolist.filter}
            />
        </>
    );
});

export default TasksList;