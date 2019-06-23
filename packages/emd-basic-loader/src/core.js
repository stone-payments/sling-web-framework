import { compose } from '@stone-payments/emd-helpers';
import { withComponent } from '@stone-payments/emd-hocs';
import { LitElement } from '@stone-payments/lit-element';

import { LoaderController } from './component/LoaderController.js';
import { LoaderView } from './component/LoaderView.js';

const Loader = compose(
  LoaderController,
  withComponent
)(LitElement);

Loader.views = LoaderView;

export {
  Loader,
  LoaderController,
  LoaderView
};
