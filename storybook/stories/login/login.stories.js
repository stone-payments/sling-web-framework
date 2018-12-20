import { storiesOf } from '@storybook/vue';

import StorybookLogin from './Login';

const stories = storiesOf('Login', module);

stories
  .add('Example', () => ({
    components: { StorybookLogin },
    template: '<storybook-login />',
  }));
