import { html } from '@stone-payments/lit-element';
import '@stone-payments/emd-basic-money';
import '@stone-payments/emd-basic-date';

const getMoneyColClass = value => (value == null)
  ? 'emd-simulator-result__col emd-simulator-result__col_empty'
  : 'emd-simulator-result__col';

export const SimulatorResultView = ({
  charged,
  received,
  currency,
  date
}) => {
  return html`
    <style>
      @import url("emd-basic-simulator-result/src/component/SimulatorResult.css")
    </style>

    <div class="emd-simulator-result__wrapper">
      <div class="${getMoneyColClass(charged)}">
        <h4 class="emd-simulator-result__title">
          Valor a cobrar
        </h4>
        <emd-money
          class="emd-simulator-result__money"
          .currency="${currency}"
          .value="${charged}">
        </emd-money>
      </div>
      
      <div class="${getMoneyColClass(received)}">
        <h4 class="emd-simulator-result__title">
          Vou receber
        </h4>
        <emd-money
          class="emd-simulator-result__money"
          .currency="${currency}"
          .value="${received}">
        </emd-money>
      </div>
    
      ${date ? html`
        <div class="emd-simulator-result__col">
          <h4 class="emd-simulator-result__title">
            Receba dia
          </h4>
          <emd-date
            class="emd-simulator-result__date"
            .date="${date}"
            format="DD/MM">
          </emd-date>
        </div>
      ` : ''}
    </div>
  `;
};
