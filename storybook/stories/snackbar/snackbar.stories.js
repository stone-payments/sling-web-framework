import { storiesOf } from '@storybook/vue';

import StorybookNormalSnackbar from './SnackbarNormal';
import StorybookDangerSnackbar from './SnackbarDanger';
import StorybookSuccessSnackbar from './SnackbarSuccess';
import StorybookWarningSnackbar from './SnackbarWarning';

const stories = storiesOf('Snackbar', module);

stories
  .add('Normal', () => ({
    components: { StorybookNormalSnackbar },
    template: '<storybook-normal-snackbar />',
  }))
  .add('Danger', () => ({
    components: { StorybookDangerSnackbar },
    template: '<storybook-danger-snackbar />',
  }))
  .add('Success', () => ({
    components: { StorybookSuccessSnackbar },
    template: '<storybook-success-snackbar />',
  }))
  .add('Warning', () => ({
    components: { StorybookWarningSnackbar },
    template: '<storybook-warning-snackbar />',
  }));
