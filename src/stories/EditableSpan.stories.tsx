import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../components/EditableSpan";


export default {
    title: 'Todolists/EditableSpan',
    component: EditableSpan,
    argTypes: {
        changeTitle: {
                description: 'Value EditableSpan changed'
            },
        oldTitle: {
            defaultValue: 'Click on me twice',
            description: 'Start value of EditableSpan'
        }
    },
} as ComponentMeta<typeof EditableSpan>;


const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});


EditableSpanStory.args = {
    changeTitle: action('Value EditableSpan changed')
}