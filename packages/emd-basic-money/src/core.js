import { compose } from '@stone-payments/emd-helpers';
import { withComponent } from '@stone-payments/emd-hocs';

import { MoneyController } from './component/MoneyController.js';
import { MoneyView } from './component/MoneyView.js';

const Money = compose(
  MoneyController,
  withComponent
)(HTMLElement);

Money.views = MoneyView;

export {
  Money,
  MoneyController,
  MoneyView
};
