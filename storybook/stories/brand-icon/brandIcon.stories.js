import { storiesOf } from '@storybook/vue';

import StorybookDefaultBrandIcon from './BrandIconDefault';
import StorybookCustomBrandIcon from './BrandIconCustom';

const stories = storiesOf('Brand Icon', module);

stories
.add('Default', () => ({
  components: { StorybookDefaultBrandIcon },
  template: '<storybook-default-brand-icon />',
}))
.add('Custom Logos', () => ({
  components: { StorybookCustomBrandIcon },
  template: '<storybook-custom-brand-icon />',
}))