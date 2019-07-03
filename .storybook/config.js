import { configure } from '@storybook/vue';
import './style.css';

const loadStories = () => {
  require('../packages/emd-basic-login/src/component/Login.stories.js');
}

configure(loadStories, module);
