import { html } from '@stone-payments/lit-element';

const getTableClass = (clickablerows, expandedbody) => {
  let result = 'emd-table__wrapper ';
  result += clickablerows ? 'emd-table__wrapper_clickable ' : '';
  result += expandedbody ? 'emd-table__wrapper_expanded ' : '';
  return result.trim();
};

export const TableView = ({
  rows = [],
  wrappedTitles = [],
  handleRowClick,
  dispatchCustomEvent,
  getHeaderAdapter,
  getHeaderStyleStrings,
  getRowAdapter,
  getRowStyleStrings,
  clickablerows,
  expandedbody
}) => html`
  <style>
    @import url("emd-basic-table/src/component/Table.css")
  </style>
  <table class="${getTableClass(clickablerows, expandedbody)}">
    ${wrappedTitles.length > 0 ? html`
      <thead class="emd-table__header">
        ${wrappedTitles.map((row, rowIndex) => html`
          <tr class="emd-table__row">
            ${getHeaderAdapter(row, rowIndex)(row, rowIndex, dispatchCustomEvent(rowIndex)).map((cell, cellIndex, cellArray) => html`
              <th
                style="${getHeaderStyleStrings(cellArray.length)[cellIndex]}"
                class="emd-table__cell">
                ${cell}
              </th>
            `)}
          </tr>
        `)}
      </thead>
    ` : ''}
    ${rows.length > 0 ? html`
      <tbody class="emd-table__body">
        ${rows.map((row, rowIndex) => html`
          <tr class="emd-table__row">
            ${getRowAdapter(row, rowIndex)(row, rowIndex, dispatchCustomEvent(rowIndex)).map((cell, cellIndex, cellArray) => html`
              <td
                @click="${handleRowClick(rowIndex)}"
                style="${getRowStyleStrings(row, rowIndex, cellArray.length)[cellIndex]}"
                class="emd-table__cell">
                ${cell}
              </td>
            `)}
          </tr>
        `)}
      </tbody>
    ` : ''}
  </table>
`;
