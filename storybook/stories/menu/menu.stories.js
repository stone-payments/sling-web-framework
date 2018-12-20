import { storiesOf } from '@storybook/vue';

import StorybookMenuVertical from './Vertical';
import StorybookMenuHorizontal from './Horizontal';
import StorybookMenuIcon from './IconOnly';

const stories = storiesOf('Menu', module);

stories
  .add('Vertical', () => ({
    components: { StorybookMenuVertical },
    template: '<storybook-menu-vertical />',
  }))
  .add('Horizontal', () => ({
    components: { StorybookMenuHorizontal },
    template: '<storybook-menu-horizontal />',
  }))
  .add('Icon Only', () => ({
    components: { StorybookMenuIcon },
    template: '<storybook-menu-icon />',
  }))
