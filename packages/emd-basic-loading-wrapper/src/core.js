import { compose } from '@stone-payments/emd-helpers';
import { withComponent } from '@stone-payments/emd-hocs';
import { LitElement } from '@stone-payments/lit-element';

import { LoadingWrapperController } from './component/LoadingWrapperController.js';
import { LoadingWrapperView } from './component/LoadingWrapperView.js';

const LoadingWrapper = compose(
  LoadingWrapperController,
  withComponent
)(LitElement);

LoadingWrapper.views = LoadingWrapperView;

export {
  LoadingWrapper,
  LoadingWrapperController,
  LoadingWrapperView
};
