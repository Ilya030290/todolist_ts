import React from 'react';
import Task from "./Task";
import {TaskType} from "./Todolist";
import ControlButtons from "./ControlButtons";
import {FilterValuesType} from "./App";


type TasksListPropsType = {
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (todolistID: string, taskID: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    todolistID: string
    changeTaskTitle: (todolistID: string, taskID: string, title: string) => void
};

const TasksList = (props: TasksListPropsType) => {

    const tasksComponentsList = props.tasks.map( task => {
        return <Task key={task.id} {...task}
                     removeTask={props.removeTask}
                     changeTaskStatus={props.changeTaskStatus}
                     todolistID={props.todolistID}
                     changeTaskTitle={props.changeTaskTitle}
        />
    });

    const emptyMessage = <span style={{fontSize: "10px"}}>Tasks list with this filter is empty. Please add task</span>

    const tasksList = tasksComponentsList.length
        ?
        <ul>
            {tasksComponentsList}
        </ul>
        :
        emptyMessage
    return (
        <>
            {tasksList}
            <ControlButtons
                todolistID={props.todolistID}
                changeFilter={props.changeFilter}
                filter={props.filter}
            />
        </>
    );
};

export default TasksList;