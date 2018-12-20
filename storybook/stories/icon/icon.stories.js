import { storiesOf } from '@storybook/vue';

import StorybookIconSuccess from './IconSuccess';
import StorybookIconDanger from './IconDanger';
import StorybookIconClose from './IconClose';
import StorybookIconWarning from './IconWarning';
import StorybookIconInfo from './IconInfo';

const stories = storiesOf('Icon', module);

stories
  .add('Success', () => ({
    components: { StorybookIconSuccess },
    template: '<storybook-icon-success />',
  }))
  .add('Danger', () => ({
    components: { StorybookIconDanger },
    template: '<storybook-icon-danger />',
  }))
  .add('Close', () => ({
    components: { StorybookIconClose },
    template: '<storybook-icon-close />',
  }))
  .add('Warning', () => ({
    components: { StorybookIconWarning },
    template: '<storybook-icon-warning />',
  }))
  .add('Info', () => ({
    components: { StorybookIconInfo },
    template: '<storybook-icon-info />',
  }))