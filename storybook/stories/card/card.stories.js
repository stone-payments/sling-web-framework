import { storiesOf } from '@storybook/vue';

import StorybookCard from './Card';

const stories = storiesOf('Card', module);

stories
  .add('Examples', () => ({
    components: { StorybookCard },
    template: '<storybook-card />',
  }));
