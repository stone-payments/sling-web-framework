import { compose } from '@stone-payments/emd-helpers';
import { withComponent, withObservedChildren } from '@stone-payments/emd-hocs';

import { CardController } from './component/CardController.js';
import { CardView } from './component/CardView.js';

const Card = compose(
  CardController,
  withObservedChildren,
  withComponent
)(HTMLElement);

Card.views = CardView;

export {
  Card,
  CardController,
  CardView
};
