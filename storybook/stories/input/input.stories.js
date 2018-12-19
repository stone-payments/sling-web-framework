import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import StorybookInput from './Input';

const stories = storiesOf('Input', module);

stories
  	.add('List of input types', () => ({
    	components: { StorybookInput },
    	template: '<storybook-Input />'
  	}));
