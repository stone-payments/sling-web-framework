import { storiesOf } from '@storybook/vue';

import StorybookTable from './Table';
import StorybookTableEditable from './TableEditable';
import StorybookTableNoHeader from './TableNoHeader';
import StorybookTableClickableRows from './TableClickableRows';

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
  .add('No Header', () => ({
    components: { StorybookTableNoHeader },
    template: '<storybook-table-no-header />',
  }))
  .add('Clickable Rows', () => ({
    components: { StorybookTableClickableRows },
    template: '<storybook-table-clickable-rows />',
  }))