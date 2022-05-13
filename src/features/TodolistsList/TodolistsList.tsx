import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {
    addTodolistTC,
    ChangeTodolistFilterAC, changeTodolistTitleTC,
    FilterValuesType,
    removeTodolistTC,
    setTodolistsTC,
    TodolistType
} from "./todolists-reducer";
import {addTaskTC, deleteTaskTC, TaskStateType, updateTaskTC} from "./tasks-reducer";
import React, {useCallback, useEffect} from "react";
import {TaskStatuses} from "../../api/todolist-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import Todolist from "./Todolist/Todolist";



export const TodolistsList: React.FC = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTodolistsTC())
    }, [])

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(deleteTaskTC(todolistId, taskId));
    }, [dispatch]);

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(todolistId, title));
    }, [dispatch]);

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {status}));
    }, [dispatch]);

    const changeTaskTitle = useCallback((taskId: string, title: string, todolistId: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {title}));
    }, [dispatch]);

    const changeFilter = useCallback((id: string, filter: FilterValuesType) => {
        dispatch(ChangeTodolistFilterAC(id, filter));
    }, [dispatch]);

    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistTC(id));
    }, [dispatch]);

    const addNewTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch]);

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodolistTitleTC(id, title));
    }, [dispatch]);


    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addNewTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map((el) => {
                        let tasksForTodoList = tasks[el.id];
                        return (
                            <Grid item key={el.id}>
                                <Paper style={{padding: "20px"}} elevation={10}>
                                    <Todolist
                                        key={el.id}
                                        todolistID={el.id}
                                        title={el.title}
                                        tasks={tasksForTodoList}
                                        filter={el.filter}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    );
}