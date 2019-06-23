import { html } from '@stone-payments/lit-element';
import { APPEARANCE_MAP } from '../constants/appearance.js';

const getStypeProperty = (styles, index) => propName =>
  `${APPEARANCE_MAP[propName]}: ${styles[index][propName]}; `;

const getCellStyle = (styles, index) => Object.keys(APPEARANCE_MAP)
  .map(getStypeProperty(styles, index))
  .join('')
  .trim();

const getTableClass = (clickablerows, expandedbody) => {
  let result = 'emd-table__wrapper ';
  result += clickablerows ? 'emd-table__wrapper_clickable ' : '';
  result += expandedbody ? 'emd-table__wrapper_expanded ' : '';

  return result.trim();
};

export const TableView = ({
  headerRow,
  headerStyles,
  matrix,
  matrixStyles,
  clickablerows,
  expandedbody,
  handleRowClick
}) => html`
  <style>
    @import url("emd-basic-table/src/component/Table.css")
  </style>
  <table class="${getTableClass(clickablerows, expandedbody)}">
    ${headerRow.length > 0 ? html`
      <thead class="emd-table__header">
        <tr class="emd-table__row">
          ${headerRow.map((cell, cellIndex) => html`
            <th
              class="emd-table__cell"
              style="${getCellStyle(headerStyles, cellIndex)}">
              ${cell}
            </th>
          `)}
        </tr>
      </thead>
    ` : ''}
    ${matrix.length > 0 ? html`
      <tbody class="emd-table__body">
        ${matrix.map((row, rowIndex) => html`
          <tr class="emd-table__row">
            ${row.map((cell, cellIndex) => html`
              <td
                @click="${handleRowClick(rowIndex)}"
                class="emd-table__cell"
                style="${getCellStyle(matrixStyles[rowIndex], cellIndex)}">
                ${cell}
              </td>
            `)}
          </tr>
        `)}
      </tbody>
    ` : ''}
  </table>
`;
