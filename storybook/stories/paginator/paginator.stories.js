import { storiesOf } from '@storybook/vue';

import StorybookPaginator from './Paginator';

const stories = storiesOf('Paginator', module);

stories
  .add('Examples', () => ({
    components: { StorybookPaginator },
    template: '<storybook-paginator />',
  }));
