import { storiesOf } from '@storybook/vue';

import StorybookSelect from './Select';

const stories = storiesOf('Select', module);

stories
  .add('Types of select', () => ({
    components: { StorybookSelect },
    template: '<storybook-select />',
  }));
