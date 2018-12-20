import { storiesOf } from '@storybook/vue';

import StorybookTable from './Table';
import StorybookTableEditable from './TableEditable';

const stories = storiesOf('Table', module);

stories
  .add('Default', () => ({
    components: { StorybookTable },
    template: '<storybook-table />',
  }))
  .add('Editable', () => ({
    components: { StorybookTableEditable },
    template: '<storybook-table-editable />',
  }))
