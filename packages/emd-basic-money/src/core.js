import { compose } from '@stone-payments/emd-helpers';
import { withComponent } from '@stone-payments/emd-hocs';
import { LitElement } from '@stone-payments/lit-element';

import { MoneyController } from './component/MoneyController.js';
import { MoneyView } from './component/MoneyView.js';

const Money = compose(
  MoneyController,
  withComponent
)(LitElement);

Money.views = MoneyView;

export {
  Money,
  MoneyController,
  MoneyView
};
