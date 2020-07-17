import { configure, addParameters } from '@storybook/vue';
import './style.css';

addParameters({
  options: {
    panelPosition: 'right'
  },
});

const loadStories = () => {
  require('../packages/emd-basic-brand-icon/src/component/BrandIcon.stories.js');
  require('../packages/emd-basic-button/src/component/Button.stories.js');
  require('../packages/emd-basic-card/src/component/Card.stories.js');
  require('../packages/emd-basic-icon/src/component/Icon.stories.js');
  require('../packages/emd-basic-login/src/component/Login.stories.js');
  require('../packages/emd-basic-money/src/component/Money.stories.js');
  require('../packages/emd-basic-notification/src/component/Notification.stories.js');
  require('../packages/emd-basic-pin-code/src/component/PinCode.stories.js');
  require('../packages/emd-basic-slideshow/src/component/Slideshow.stories.js');
  require('../packages/emd-basic-tooltip/src/component/Tooltip.stories.js');
}

configure(loadStories, module);
