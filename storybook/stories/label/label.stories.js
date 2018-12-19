import { storiesOf } from '@storybook/vue';

import StorybookFillLabel from './LabelFill';
import StorybookOutlineLabel from './LabelOutline';
import StorybookOnlyTextLabel from './LabelOnlyText';
import StorybookWithBulletLabel from './LabelWithBullet';
import StorybookWithIconLabel from './LabelWithIcon';

const stories = storiesOf('Label', module);

stories
  .add('Fill', () => ({
    components: { StorybookFillLabel },
    template: '<storybook-fill-label />',
  }))
  .add('Outline', () => ({
    components: { StorybookOutlineLabel },
    template: '<storybook-outline-label />',
  }))
  .add('Only text', () => ({
    components: { StorybookOnlyTextLabel },
    template: '<storybook-only-text-label />',
  }))
  .add('With bullet', () => ({
    components: { StorybookWithBulletLabel },
    template: '<storybook-with-bullet-label />',
  }))
  .add('With Icon', () => ({
    components: { StorybookWithIconLabel },
    template: '<storybook-with-icon-label />',
  }));
