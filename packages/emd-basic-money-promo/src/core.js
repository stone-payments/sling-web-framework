import { compose } from '@stone-payments/emd-helpers';
import { withComponent } from '@stone-payments/emd-hocs';
import { LitElement } from '@stone-payments/lit-element';

import { MoneyPromoController } from './component/MoneyPromoController.js';
import { MoneyPromoView } from './component/MoneyPromoView.js';

const MoneyPromo = compose(
  MoneyPromoController,
  withComponent
)(LitElement);

MoneyPromo.views = MoneyPromoView;

export {
  MoneyPromo,
  MoneyPromoController,
  MoneyPromoView
};
