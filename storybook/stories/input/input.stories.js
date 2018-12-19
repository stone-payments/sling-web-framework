import { storiesOf } from '@storybook/vue';

import StorybookInput from './Input';

const stories = storiesOf('Input', module);

stories
	.add('List of input types', () => ({
  	components: { StorybookInput },
  	template: '<storybook-Input />',
	}));
