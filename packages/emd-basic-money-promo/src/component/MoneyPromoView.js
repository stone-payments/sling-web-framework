import { html } from '@stone-payments/lit-element';

export const MoneyPromoView = ({ valueInteger, valueCents, period }) => html`
  <style>
    @import url("emd-basic-money-promo/src/component/MoneyPromo.css")
  </style>
  <div class="promo">
    <div class="promo__currency">R$</div>
    <div class="promo__value">${valueInteger}</div>
    <div>
      <div class="promo__cents">,${valueCents}</div>
      <div class="promo__period">/${period}</div>
    </div>
  </div>
`;
