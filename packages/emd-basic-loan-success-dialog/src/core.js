import { compose } from '@stone-payments/emd-helpers';
import { withComponent } from '@stone-payments/emd-hocs';
import { LitElement } from '@stone-payments/lit-element';

import { LoanSuccessDialogController } from './component/LoanSuccessDialogController.js';
import { LoanSuccessDialogView } from './component/LoanSuccessDialogView.js';

const LoanSuccessDialog = compose(
  LoanSuccessDialogController,
  withComponent
)(LitElement);

LoanSuccessDialog.views = LoanSuccessDialogView;

export {
  LoanSuccessDialog,
  LoanSuccessDialogController,
  LoanSuccessDialogView
};
