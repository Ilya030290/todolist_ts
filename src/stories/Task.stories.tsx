import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import Task from "../Task";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";


export default {
    title: 'Todolists/Task',
    component: Task
} as ComponentMeta<typeof Task>;


const removeTaskCallback = action('Remove Task');
const changeTaskStatusCallback = action('Change TaskStatus');
const changeTaskTitleCallback = action('Change TaskTitle');


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

const baseArgs = {
    removeTask: removeTaskCallback,
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback
}

export const TaskIsDoneStory = Template.bind({});


TaskIsDoneStory.args = {
    ...baseArgs,
    id: '1',
    title: 'JS',
    status: TaskStatuses.Completed,
    todoListId: 'Todolist Id1',
    description: '',
    startDate: '',
    deadline: '',
    addedDate: '',
    order: 0,
    priority: TaskPriorities.Low
}

export const TaskIsNotDoneStory = Template.bind({});


TaskIsNotDoneStory.args = {
    ...baseArgs,
    id: '2',
    title: 'React',
    status: TaskStatuses.New,
    todoListId: 'Todolist Id1',
    description: '',
    startDate: '',
    deadline: '',
    addedDate: '',
    order: 0,
    priority: TaskPriorities.Low
}