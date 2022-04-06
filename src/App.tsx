import React from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

export type FilterValuesType = "all" | "active" | "completed";

export type todolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todolists = useSelector<AppRootStateType, Array<todolistsType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);

    const dispatch = useDispatch();

    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId));
    };

    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId));
    };

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId));
    };

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todolistId));
    };

    const changeFilter = (id: string, filter: FilterValuesType) => {
        dispatch(ChangeTodolistFilterAC(id, filter));
    };

    const removeTodolist = (id: string) => {
        dispatch(RemoveTodolistAC(id));
    };

    const addNewTodolist = (title: string) => {
        dispatch(AddTodolistAC(title));
    };

    const changeTodolistTitle = (id: string, title: string) => {
        dispatch(ChangeTodolistTitleAC(id, title));
    };

    const todolistsComponents = todolists.map((el) => {
        let tasksForTodolist = tasks[el.id];

        if (el.filter === "active") {
            tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
        }
        if (el.filter === "completed") {
            tasksForTodolist = tasks[el.id].filter(t => t.isDone);
        }
        return (
            <Grid item key={el.id}>
                <Paper style={{padding: "20px"}} elevation={10}>
                    <Todolist
                        key={el.id}
                        todolistID={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
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
    });

    return (
            <div className="App">
                <AppBar position="static">
                    <Toolbar style={{justifyContent: "space-between"}}>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu />
                        </IconButton>
                        <Typography variant="h6">
                            Todolists
                        </Typography>
                        <Button color="inherit" variant={"outlined"}>Login</Button>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container style={{padding: "20px 0px"}}>
                        <AddItemForm addItem={addNewTodolist} />
                    </Grid>
                    <Grid container spacing={3}>
                        {todolistsComponents}
                    </Grid>
                </Container>
            </div>
    );
}

export default App;
