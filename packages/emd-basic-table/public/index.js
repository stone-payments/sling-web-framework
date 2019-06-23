import { html } from '@stone-payments/lit-element';
import '@stone-payments/emd-basic-date';
import '@stone-payments/emd-basic-brand-icon';
import '@stone-payments/emd-basic-money';

import { rows } from './rows.js';
import '../src/index.js';

const tables = Array.from(document.querySelectorAll('emd-table'));

const header = ['Data', 'Bandeira', 'Valor Pago'];

const appearance = {
  align: ['left', 'center', 'right'],
  valign: 'middle'
};

const adapter = ({ value, currency, brand, date }) => [
  html`
    <emd-date
      date="${date}"
      format="DD/MM [às] HH[h]mm"
      style="font-size:0.875em">
    </emd-date>
  `,
  html`
    <emd-brand-icon
      icon="${brand}"
      style="font-size:16px">
    </emd-brand-icon>
  `,
  html`
    <emd-money
      value="${value}"
      currency="${currency}">
    </emd-money>
  `
];

tables.forEach(table => {
  table.rows = rows;
  table.adapter = adapter;
  table.appearance = appearance;
  table.header = header;
});

tables[3].header = null;

tables[7].appearance = {
  default: appearance,
  nth: {
    5: {
      background: 'rgba(247, 158, 27, 0.1)',
      border: 'rgba(247, 158, 27, 0.5)'
    }
  }
};

tables[8].appearance = {
  default: appearance,
  nth: {
    5: {
      background: 'rgba(247, 158, 27, 0.1)',
      border: 'rgba(247, 158, 27, 0.5)'
    }
  }
};
