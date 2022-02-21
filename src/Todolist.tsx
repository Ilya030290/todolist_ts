import React from 'react';
import TodolistHeader from "./TodolistHeader";
import TasksList from "./TasksList";
import {FilterValuesType} from "./App";


type TodolistPropsType = {
    title: string,
    tasks: Array<TaskType>,
    filter: FilterValuesType,
    removeTask: (taskID: string) => void,
    changeFilter: (filter: FilterValuesType) => void,
    addTask: (title: string) => void,
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

const Todolist = (props: TodolistPropsType) => {
    return (
            <div>
                <TodolistHeader title={props.title} addTask={props.addTask} filter={props.filter}/>
                <TasksList tasks={props.tasks}
                           removeTask={props.removeTask}
                           changeFilter={props.changeFilter}
                           filter={props.filter}
                           changeTaskStatus={props.changeTaskStatus}/>
            </div>
    );
};

export default Todolist;