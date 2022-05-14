import React, {useEffect} from 'react';
import {TodolistHeader} from "./TodolistHeader/TodolistHeader";
import TasksList from "./TasksList/TasksList";
import {FilterValuesType, TodolistType} from "../todolists-reducer";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {setTasksTC} from "../tasks-reducer";
import {useAppDispatch} from "../../../app/store";


type TodolistPropsType = {
    todolist: TodolistType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (id: string, filter: FilterValuesType) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodolistTitle: (id: string, title: string) => void
    demo?: boolean
}


const Todolist = React.memo(({demo = false, ...props}: TodolistPropsType) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (demo) {
            return;
        }
        dispatch(setTasksTC(props.todolist.id))
    }, [])

    let tasksForTodolist = props.tasks;

    if (props.todolist.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
    }

    return (
            <div style={{width: "fit-content", textAlign: "center"}}>
                <TodolistHeader
                    todolist={props.todolist}
                    removeTodolist={props.removeTodolist}
                    addTask={props.addTask}
                    changeTodolistTitle={props.changeTodolistTitle}
                />
                <TasksList
                    todolist={props.todolist}
                    tasks={tasksForTodolist}
                    removeTask={props.removeTask}
                    changeFilter={props.changeFilter}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                />
            </div>
    );
});

export default Todolist;