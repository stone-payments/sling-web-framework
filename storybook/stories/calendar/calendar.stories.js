import { storiesOf } from '@storybook/vue';

import StorybookCalendar from './Calendar';

const stories = storiesOf('Calendar', module);

stories
  .add('Calendar', () => ({
    components: { StorybookCalendar },
    template: '<storybook-calendar />',
  }));
