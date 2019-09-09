import { html } from '@stone-payments/lit-element';
import '@stone-payments/emd-basic-date';
import '@stone-payments/emd-basic-brand-icon';
import '@stone-payments/emd-basic-money';
import '@stone-payments/emd-basic-button';

import { rows } from './rows.js';
import '../src/index.js';

const tables = Array.from(document.querySelectorAll('emd-table'));

const titles = ['Data', 'Bandeira', 'Valor Pago'];

const style = {
  textAlign: ['left', 'center', 'right'],
  verticalAlign: 'middle'
};

const headerstyle = {
  textAlign: ['left', 'center', 'right'],
  fontWeight: ['bold', null, null],
  fontStyle: [null, null, 'italic']
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
  table.titles = titles;
  table.headerstyle = headerstyle;
});

tables[3].titles = undefined;

tables[7].styles = {
  odd: {
    textAlign: ['left', 'center', 'right'],
    verticalAlign: 'middle'
  },
  even: {
    textAlign: ['left', 'center', 'right'],
    verticalAlign: 'middle',
    backgroundColor: 'rgba(247, 158, 27, 0.1)'
  }
};

tables[7].usestyle = (row, index) => {
  return index / 2 === Math.round(index / 2)
    ? 'even'
    : 'odd';
};

tables[8].styles = tables[7].styles;
tables[8].usestyle = tables[7].usestyle;

tables[9].titles = ['Data', 'Bandeira', 'Valor Pago', 'Ações'];

tables[9].style = {
  textAlign: ['left', 'center', 'right', 'right'],
  width: [null, null, null, '160px']
};

tables[9].headerstyle = tables[9].style;

tables[9].adapter = ({ value, currency, brand, date }, index, dispatch) => [
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
programaticTable.style = style;
programaticTable.titles = titles;
programaticTable.headerstyle = headerstyle;

document.body.appendChild(programaticTable);
