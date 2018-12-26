import { storiesOf } from '@storybook/vue';

import StorybookLoader from './Loader';

const stories = storiesOf('loader', module);

stories
  .add('Example', () => ({
    components: { StorybookLoader },
    template: '<storybook-loader />',
  }));
