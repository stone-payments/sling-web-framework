import { compose } from '@stone-payments/emd-helpers';
import { withComponent } from '@stone-payments/emd-hocs';
import { LitElement } from '@stone-payments/lit-element';

import { FeatureController } from './component/FeatureController.js';
import { FeatureView } from './component/FeatureView.js';

const Feature = compose(
  FeatureController,
  withComponent
)(LitElement);

Feature.views = FeatureView;

export {
  Feature,
  FeatureController,
  FeatureView
};
