import { html } from '@stone-payments/lit-html';

export const MoneyView = ({
  colorblock,
  currencyProportion,
  currencyMargin,
  formattedCurrency,
  formattedValue
}) => {
  const moneyClasses = colorblock ? ' emd-money__wrapper_color_block' : '';

  let currencyStyle = '';

  currencyStyle += currencyMargin
    ? `margin-right: ${currencyMargin}em;`
    : '';

  currencyStyle += currencyProportion
    ? `font-size: ${currencyProportion}em;`
    : '';

  return html`
    <style>
      @import url("emd-basic-money/src/component/Money.css")
    </style>
    <span class="emd-money__wrapper${moneyClasses}">
      ${formattedCurrency ? html`
        <span
          class="emd-money__currency"
          style="${currencyStyle}">
          ${formattedCurrency}
        </span>
      ` : ''}
      <span class="emd-money__value">${formattedValue}</span>
    </span>
  `;
};
