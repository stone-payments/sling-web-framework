import { html } from '@stone-payments/lit-element';

export const MoneyView = ({
  isPositive,
  isNegative,
  isNeutral,
  hidevalue,
  hidepositivesign,
  sign,
  formattedCurrency,
  formattedValue
}) => {
  let moneyClass = 'emd-money__wrapper';
  moneyClass += isPositive && !hidevalue ? ' emd-money__wrapper_positive' : '';
  moneyClass += isNegative && !hidevalue ? ' emd-money__wrapper_negative' : '';
  moneyClass += isNeutral || hidevalue ? ' emd-money__wrapper_neutral' : '';
  moneyClass += hidevalue ? ' emd-money__wrapper_value_hidden' : '';

  return html`
    <style>
      @import url("emd-basic-money/src/component/Money.css")
    </style>
    <span class="${moneyClass}">
      ${sign != null && !hidevalue && (!hidepositivesign || sign !== '+') ? html`
        <span>${sign}</span>
      ` : ''}
      ${formattedCurrency ? html`
        <span>${formattedCurrency}</span>
      ` : ''}
      <span class="emd-money__effect">
        <span>${formattedValue}</span>
      </span>
    </span>
  `;
};
