import { compose } from '@stone-payments/emd-helpers';
import { withComponent, withObservedChildren } from '@stone-payments/emd-hocs';
import { LitElement } from '@stone-payments/lit-element';

import { SlideshowController } from './component/SlideshowController.js';
import { SlideshowView } from './component/SlideshowView.js';

const Slideshow = compose(
  SlideshowController,
  withObservedChildren,
  withComponent
)(LitElement);

Slideshow.views = SlideshowView;

export {
  Slideshow,
  SlideshowController,
  SlideshowView
};
