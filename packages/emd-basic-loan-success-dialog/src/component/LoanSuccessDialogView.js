import { html } from '@stone-payments/lit-element';
import '@stone-payments/emd-basic-icon';
import '@stone-payments/emd-basic-button';
import { moneyFormatter } from '@stone-payments/emd-formatters';

export const LoanSuccessDialogView = ({
  deadline,
  amount,
  handleButtonClick
}) => html`
  <style>
    @import url("emd-basic-loan-success-dialog/src/component/LoanSuccessDialog.css")
  </style>
  <div class="loan-success-dialog__wrapper">
    <div class="loan-success-dialog__header">
      <emd-icon class="loan-success-dialog__icon" icon="check-outlined"></emd-icon>
      <h1 class="loan-success-dialog__title">Empréstimo contratado com sucesso.</h1>
      <h2 class="loan-success-dialog__subtitle">Aproveite!</h2>
    </div>
    <div class="loan-success-dialog__body">
      <p>Seu empréstimo contratado no valor de <strong>R$ ${moneyFormatter(amount)}</strong> será depositado em sua conta em até <strong>${deadline}</strong>.</p>
    </div>
    <div class="loan-success-dialog__footer">
      <emd-button
        @click="${handleButtonClick}"
        class="loan-success-dialog__button">OK</emd-button>
    </div>
  </div>
`;
