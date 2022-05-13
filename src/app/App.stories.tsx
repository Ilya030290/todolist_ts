import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import App from "./App";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";



export default {
    title: 'Todolists/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]

} as ComponentMeta<typeof App>;


const Template: ComponentStory<typeof App> = () => <App />;

export const AppStory = Template.bind({});