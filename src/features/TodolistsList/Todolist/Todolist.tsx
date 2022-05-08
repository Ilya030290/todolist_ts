import React, {useEffect} from 'react';
import {TodolistHeader} from "./TodolistHeader/TodolistHeader";
import TasksList from "./TasksList/TasksList";
import {FilterValuesType} from "../todolists-reducer";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {setTasksTC} from "../tasks-reducer";
import {useAppDispatch} from "../../../app/store";


type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (id: string, filter: FilterValuesType) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodolistTitle: (id: string, title: string) => void
}



const Todolist = React.memo((props: TodolistPropsType) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTasksTC(props.todolistID))
    }, [])

    let tasksForTodolist = props.tasks;

    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
    }

    return (
            <div style={{width: "fit-content", textAlign: "center"}}>
                <TodolistHeader
                    removeTodolist={props.removeTodolist}
                    todolistID={props.todolistID}
                    title={props.title}
                    addTask={props.addTask}
                    filter={props.filter}
                    changeTodolistTitle={props.changeTodolistTitle}
                />
                <TasksList
                    todolistID={props.todolistID}
                    tasks={tasksForTodolist}
                    removeTask={props.removeTask}
                    changeFilter={props.changeFilter}
                    filter={props.filter}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                />
            </div>
    );
});

export default Todolist;