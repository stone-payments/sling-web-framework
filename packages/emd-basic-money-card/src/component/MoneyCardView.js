import { html } from '@stone-payments/lit-element';
import '@stone-payments/emd-basic-money';

export const MoneyCardView = ({
  headline,
  currency,
  value,
  colorblock,
  view
}) => {
  let moneyCardClasses = '';

  moneyCardClasses += colorblock
    ? ' emd-money-card__wrapper_color_block'
    : '';

  moneyCardClasses += view
    ? ` emd-money-card__wrapper_${view}`
    : '';

  const showContent = currency != null && value != null;

  return html`
    <style>
      @import url("emd-basic-money-card/src/component/MoneyCard.css")
    </style>
    <div class="emd-money-card__wrapper${moneyCardClasses}">
      <div class="emd-money-card__content">
        <p class="emd-money-card__headline">${headline}</p>
        <emd-money
          class="emd-money-card__money"
          ?colorblock=${colorblock}
          currency="${showContent ? currency : undefined}"
          value="${showContent ? value : undefined}">
        </emd-money>
      </div>
      ${view !== 'compact' ? html`
        <slot></slot>
      ` : ''}
    </div>
  `;
};
