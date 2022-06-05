import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import App from "./App";
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";



export default {
    title: 'Todolists/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]

} as ComponentMeta<typeof App>;


const Template: ComponentStory<typeof App> = () => <App demo={true}/>;

export const AppStory = Template.bind({});