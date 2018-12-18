import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import StorybookButton from './Button';

const stories = storiesOf('Button', module);

stories
  	.add('Test', () => ({
    	components: { StorybookButton },
    	template: '<storybook-button />',
    	methods: { action: action('clicked') },
  	}));
