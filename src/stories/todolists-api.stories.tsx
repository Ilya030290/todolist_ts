import React, {ChangeEvent, useState} from 'react';
import {TodolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    const getTodolists = () => {
        TodolistApi.getTodos()
            .then((res) => {
                setState(res.data);
            })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <button onClick={getTodolists}>get Todolists</button>
        </div>
    </div>
}


export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null)
    const [todolistTitle, setTodolistTitle] = useState<string>("")


    const onChangeTodolistTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistTitle(e.currentTarget.value);
    }

    const createTodolist = () => {
        TodolistApi.createTodo(todolistTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistTitle"} value={todolistTitle} onChange={onChangeTodolistTitle}/>
            <button onClick={createTodolist}>create Todolist</button>
        </div>
    </div>
}


export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")

    const onChangeTodolist = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value);
    }

    const deleteTodolist = () => {
        TodolistApi.deleteTodo(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={onChangeTodolist}/>
            <button onClick={deleteTodolist}>delete Todolist</button>
        </div>
    </div>
}


export const UpdateTodolistTitle = () => {

    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const onChangeTodolist = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value);
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const updateTodolistTitle = () => {
        TodolistApi.updateTodoTitle(todolistId, title)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={onChangeTodolist}/>
            <input placeholder={"title"} value={title} onChange={onChangeTitle}/>
            <button onClick={updateTodolistTitle}>update todolistTitle</button>
        </div>
    </div>
}


export const GetTasks = () => {

    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")

    const onChangeGetTasks = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value);
    }

    const getTasks = () => {
        TodolistApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={onChangeGetTasks}/>
            <button onClick={getTasks}>get Tasks</button>
        </div>
    </div>
}


export const DeleteTask = () => {

    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")

    const onChangeTodolistHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value);
    }
    const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value);
    }

    const deleteTask = () => {
        TodolistApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div>
            {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={onChangeTodolistHandler}/>
            <input placeholder={"taskId"} value={taskId} onChange={onChangeTaskHandler}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}


export const CreateTask = () => {

    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [taskTitle, setTaskTitle] = useState<string>("")

    const onChangeTodolistHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value);
    }
    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
    }

    const createTask = () => {
        TodolistApi.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={onChangeTodolistHandler}/>
            <input placeholder={"taskTitle"} value={taskTitle} onChange={onChangeTaskTitle}/>
            <button onClick={createTask}>create task</button>
        </div>
    </div>
}


export const UpdateTask = () => {

    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>("title1")
    const [description, setDescription] = useState<string>("description1")
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')


    const updateTask = () => {
        TodolistApi.updateTask(todolistId, taskId, {description, priority, title, deadline: "", startDate: "", status})
            .then((res) => {
                setState(res.data);
            })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={"taskId"} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={"taskTitle"} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}}/>
            <input placeholder={"description"} value={description} onChange={(e) => setDescription(e.currentTarget.value)}/>
            <input placeholder={"status"} value={status} onChange={(e) => setStatus(Number(e.currentTarget.value))}/>
            <input placeholder={"priority"} value={priority} onChange={(e) => setPriority(Number(e.currentTarget.value))}/>
            <button onClick={updateTask}>update task</button>
        </div>
    </div>
}