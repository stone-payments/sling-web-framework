import { compose } from '@stone-payments/emd-helpers';
import { withComponent } from '@stone-payments/emd-hocs';
import { LitElement } from '@stone-payments/lit-element';

import { ButtonController } from './component/ButtonController.js';
import { ButtonView } from './component/ButtonView.js';

const Button = compose(
  ButtonController,
  withComponent
)(LitElement);

Button.views = ButtonView;

export {
  Button,
  ButtonController,
  ButtonView
};
