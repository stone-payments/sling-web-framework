import { storiesOf } from '@storybook/vue';

import StorybookTooltip from './Tooltip';

const stories = storiesOf('Tooltip', module);

stories
  .add('List of tooltips', () => ({
    components: { StorybookTooltip },
    template: '<storybook-tooltip />',
  }));
