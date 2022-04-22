import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import Task from "../Task";


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
    id: 'qwe',
    title: 'JS',
    isDone: true,
    todolistID: 'Todolist Id'
}

export const TaskIsNotDoneStory = Template.bind({});


TaskIsNotDoneStory.args = {
    ...baseArgs,
    id: 'qwear',
    title: 'React',
    isDone: false,
    todolistID: 'Todolist Id'
}