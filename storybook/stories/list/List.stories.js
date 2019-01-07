import { storiesOf } from '@storybook/vue';

import StorybookList from './List';

const stories = storiesOf('List', module);

stories
    .add('Example', () => ({
        components: { StorybookList },
        template: '<storybook-list />',
    }));