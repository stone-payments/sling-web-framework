import { compose } from '@stone-payments/emd-helpers';
import { withComponent } from '@stone-payments/emd-hocs';
import { LitElement } from '@stone-payments/lit-element';

import { PillSelectController } from './component/PillSelectController.js';
import { PillSelectView } from './component/PillSelectView.js';

const PillSelect = compose(
  PillSelectController,
  withComponent
)(LitElement);

PillSelect.views = PillSelectView;

export {
  PillSelect,
  PillSelectController,
  PillSelectView
};
