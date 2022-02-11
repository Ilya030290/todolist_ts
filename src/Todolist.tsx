import React from 'react';
import TodolistHeader from "./TodolistHeader";
import TasksList from "./TasksList";
import {FilterValuesType} from "./App";


type TodolistPropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskID: number) => void,
    changeFilter: (filter: FilterValuesType) => void
}

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

const Todolist = (props: TodolistPropsType) => {
    return (
            <div>
                <TodolistHeader title={props.title} />
                <TasksList tasks={props.tasks} removeTask={props.removeTask} changeFilter={props.changeFilter} />
            </div>
    );
};

export default Todolist;