import { compose } from '@stone-payments/emd-helpers';
import { withComponent } from '@stone-payments/emd-hocs';
import { LitElement } from '@stone-payments/lit-element';

import { DateController } from './component/DateController.js';
import { DateView } from './component/DateView.js';

const Date = compose(
  DateController,
  withComponent
)(LitElement);

Date.views = DateView;

export {
  Date,
  DateController,
  DateView
};
