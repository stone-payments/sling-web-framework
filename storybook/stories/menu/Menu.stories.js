import { storiesOf } from '@storybook/vue';

import StorybookMenu from './Menu';

const stories = storiesOf('Menu', module);

stories
  .add('Example', () => ({
    components: { StorybookMenu },
    template: '<storybook-menu />',
  }));
