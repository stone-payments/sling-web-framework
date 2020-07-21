import { compose } from '@stone-payments/emd-helpers';
import { withComponent } from '@stone-payments/emd-hocs';
import { LitElement } from '@stone-payments/lit-element';

import { PinCodeController } from './component/PinCodeController.js';
import { PinCodeView } from './component/PinCodeView.js';

const PinCode = compose(
  PinCodeController,
  withComponent
)(LitElement);

PinCode.views = PinCodeView;

export {
  PinCode,
  PinCodeController,
  PinCodeView
};
