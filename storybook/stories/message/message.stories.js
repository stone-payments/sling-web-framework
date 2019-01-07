import { storiesOf } from '@storybook/vue';

import StorybookErrorMessage from './MessageError';
import StorybookAlertMessage from './MessageAlert';
import StorybookSuccessMessage from './MessageSuccess';
import StorybookStandByMessage from './MessageStandby';

const stories = storiesOf('Message', module);

stories
  .add('Error', () => ({
    components: { StorybookErrorMessage },
    template: '<storybook-error-message />',
  }))
  .add('Alert', () => ({
    components: { StorybookAlertMessage },
    template: '<storybook-alert-message />',
  }))
  .add('Success', () => ({
    components: { StorybookSuccessMessage },
    template: '<storybook-success-message />',
  }))
  .add('Stand by', () => ({
    components: { StorybookStandByMessage },
    template: '<storybook-stand-by-message />',
  }));
