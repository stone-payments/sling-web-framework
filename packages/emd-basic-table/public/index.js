import { html } from '@stone-payments/lit-element';
import '@stone-payments/emd-basic-date';
import '@stone-payments/emd-basic-brand-icon';
import '@stone-payments/emd-basic-money';
import '@stone-payments/emd-basic-button';

import { rows } from './rows.js';
import '../src/index.js';

const tables = Array.from(document.querySelectorAll('emd-table'));

const titles = ['Data', 'Bandeira', 'Valor Pago'];

const appearance = {
  textAlign: ['left', 'center', 'right'],
  verticalAlign: 'middle'
};

const headerappearance = {
  textAlign: ['left', 'center', 'right']
};

const adapter = ({ value, currency, brand, date }) => [
  html`
    <emd-date
      date="${date}"
      format="DD/MM [às] HH[h]mm">
    </emd-date>
  `,
  html`
    <emd-brand-icon icon="${brand}"></emd-brand-icon>
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
  table.titles = titles;
  table.headerappearance = headerappearance;
});

tables[3].titles = undefined;

tables[7].appearances = {
  odd: {
    textAlign: ['left', 'center', 'right'],
    verticalAlign: 'middle'
  },
  even: {
    textAlign: ['left', 'center', 'right'],
    verticalAlign: 'middle',
    backgroundColor: 'rgba(247, 158, 27, 0.05)'
  }
};

tables[7].useappearance = (row, index) => {
  return index / 2 === Math.round(index / 2)
    ? 'even'
    : 'odd';
};

tables[8].appearances = tables[7].appearances;
tables[8].useappearance = tables[7].useappearance;

tables[9].titles = ['Data', 'Bandeira', 'Valor Pago', 'Ações'];

tables[9].appearance = {
  textAlign: ['left', 'center', 'right', 'right'],
  width: [null, null, null, '160px'],
  fontSize: [null, null, null, '0.875em']
};

tables[9].headerappearance = {
  textAlign: ['left', 'center', 'right', 'right'],
  width: [null, null, null, '160px']
};

tables[9].adapter = ({ value, currency, brand, date }, index, dispatch) => [
  html`
    <emd-date
      date="${date}"
      format="DD/MM [às] HH[h]mm">
    </emd-date>
  `,
  html`
    <emd-brand-icon
      icon="${brand}">
    </emd-brand-icon>
  `,
  html`
    <emd-money
      value="${value}"
      currency="${currency}">
    </emd-money>
  `,
  html`
    <emd-button @click="${dispatch('edit')}">
      Editar
    </emd-button>
  `
];

const programaticTable = document.createElement('emd-table');

programaticTable.rows = rows;
programaticTable.adapter = adapter;
programaticTable.appearance = appearance;
programaticTable.titles = titles;
programaticTable.headerappearance = headerappearance;

document.body.appendChild(programaticTable);
