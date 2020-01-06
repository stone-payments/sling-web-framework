import { configure, addParameters } from '@storybook/vue';
import './style.css';

addParameters({
  options: {
    panelPosition: 'right'
  },
});

const loadStories = () => {
  require('../packages/emd-basic-button/src/component/Button.stories.js');
  require('../packages/emd-basic-card/src/component/Card.stories.js');
  require('../packages/emd-basic-login/src/component/Login.stories.js');
  require('../packages/emd-basic-money/src/component/Money.stories.js');
}

configure(loadStories, module);
