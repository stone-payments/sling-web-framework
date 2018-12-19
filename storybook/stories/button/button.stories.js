import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import StorybookDisabledButton from './ButtonDisabled';
import StorybookPrimaryButton from './ButtonPrimary';
import StorybookDefaultButton from './ButtonDefault';
import StorybookSuccessButton from './ButtonSuccess';
import StorybookDangerButton from './ButtonDanger';
import StorybookLightButton from './ButtonLight';
import StorybookExpandableButton from './ButtonExpandable';

const stories = storiesOf('Button', module);

stories
  	.add('Disabled', () => ({
    	components: { StorybookDisabledButton },
    	template: '<storybook-disabled-button />'
  	}))
  	.add('Default', () => ({
    	components: { StorybookDefaultButton },
    	template: '<storybook-default-button />'
  	}))
  	.add('Primary', () => ({
    	components: { StorybookPrimaryButton },
    	template: '<storybook-primary-button />'
  	}))
  	.add('Success', () => ({
    	components: { StorybookSuccessButton },
    	template: '<storybook-success-button />'
  	}))
  	.add('Danger', () => ({
    	components: { StorybookDangerButton },
    	template: '<storybook-danger-button />'
  	}))
  	.add('Light', () => ({
    	components: { StorybookLightButton },
    	template: '<storybook-light-button />'
  	}))
    .add('Expandable', () => ({
      components: { StorybookExpandableButton },
      template: '<storybook-expandable-button />'
    }));
