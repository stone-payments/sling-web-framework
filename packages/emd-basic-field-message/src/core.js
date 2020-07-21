import { compose } from '@stone-payments/emd-helpers';
import { withComponent } from '@stone-payments/emd-hocs';
import { LitElement } from '@stone-payments/lit-element';

import { FieldMessageController } from './component/FieldMessageController.js';
import { FieldMessageView } from './component/FieldMessageView.js';

const FieldMessage = compose(
  FieldMessageController,
  withComponent
)(LitElement);

FieldMessage.views = FieldMessageView;

export {
  FieldMessage,
  FieldMessageController,
  FieldMessageView
};
