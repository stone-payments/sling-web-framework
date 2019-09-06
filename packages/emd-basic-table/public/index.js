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

const headeradapter = ([date, flag, value], index, dispatch) => [
  html`<strong>${date}</strong>`,
  flag,
  html`<em @click="${dispatch('value')}">${value}</em>`
];

const adapter = ({ value, currency, brand, date }, index, dispatch) => [
  html`
    ${index + 1}.
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
  table.titles = titles;
  table.headerstyle = headerstyle;
  table.headeradapter = headeradapter;
});

tables[3].titles = undefined;

tables[7].style = undefined;

tables[7].styles = {
  even: {
    textAlign: ['left', 'center', 'right'],
    verticalAlign: 'middle'
  },
  odd: {
    textAlign: ['left', 'center', 'right'],
    verticalAlign: 'middle',
    background: 'rgba(247, 158, 27, 0.1)',
    border: 'rgba(247, 158, 27, 0.5)'
  }
};

tables[7].usestyle = (row, rowIndex) => {
  return rowIndex / 2 === Math.round(rowIndex / 2)
    ? 'even'
    : 'odd';
};
