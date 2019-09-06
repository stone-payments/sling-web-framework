import { html } from '@stone-payments/lit-element';
import '@stone-payments/emd-basic-date';
import '@stone-payments/emd-basic-brand-icon';
import '@stone-payments/emd-basic-money';

import { rows } from './rows.js';
import '../src/index.js';

const tables = Array.from(document.querySelectorAll('emd-table'));

const titles = ['Data', 'Bandeira', 'Valor Pago'];

const style = {
  textAlign: ['left', 'center', 'right'],
  verticalAlign: 'middle'
};

const headerstyle = {
  textAlign: ['left', 'center', 'right']
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
  table.style = style;
  table.headerstyle = headerstyle;
  table.titles = titles;
});

tables[3].titles = undefined;
