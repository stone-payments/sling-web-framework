import { configure } from '@storybook/vue';
import './style.css';

const loadStories = () => {
  require('../packages/emd-basic-button/src/component/Button.stories.js');
  require('../packages/emd-basic-card/src/component/Card.stories.js');
  require('../packages/emd-basic-login/src/component/Login.stories.js');
}

configure(loadStories, module);
