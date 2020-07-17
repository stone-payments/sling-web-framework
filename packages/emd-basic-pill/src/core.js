import { compose } from '@stone-payments/emd-helpers';
import { withComponent } from '@stone-payments/emd-hocs';
import { LitElement } from '@stone-payments/lit-element';

import { PillController } from './component/PillController.js';
import { PillView } from './component/PillView.js';

const Pill = compose(
  PillController,
  withComponent
)(LitElement);

Pill.views = PillView;

export {
  Pill,
  PillController,
  PillView
};
