import { storiesOf } from '@storybook/vue';

import Welcome from './Welcome';

const stories = storiesOf('Welcome', module);

stories
	.add('to Storybook', () => ({
		components: { Welcome },
		template: '<welcome :showApp="action" />',
	}));
