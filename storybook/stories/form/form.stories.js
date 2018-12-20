import { storiesOf } from '@storybook/vue';

import StorybookForm from './Form';

const stories = storiesOf('Form', module);

stories
  .add('Form', () => ({
    components: { StorybookForm },
    template: '<storybook-form />',
  }));
