import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Welcome from './Welcome';

const stories = storiesOf('Welcome', module);

stories
	.add('to Storybook', () => ({
		components: { Welcome },
		template: '<welcome :showApp="action" />',
		methods: { action: linkTo('Button') },
	}));
