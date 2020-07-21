import { compose } from '@stone-payments/emd-helpers';
import { withComponent } from '@stone-payments/emd-hocs';
import { LitElement } from '@stone-payments/lit-element';

import { MoneyCardController } from './component/MoneyCardController.js';
import { MoneyCardView } from './component/MoneyCardView.js';

const MoneyCard = compose(
  MoneyCardController,
  withComponent
)(LitElement);

MoneyCard.views = MoneyCardView;

export {
  MoneyCard,
  MoneyCardController,
  MoneyCardView
};
