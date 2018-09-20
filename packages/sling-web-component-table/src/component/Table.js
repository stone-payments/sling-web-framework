import { formatCurrencyWithoutSymbol, formatDate, formatTime } from 'sling-helpers';
import imask from 'imask';
import 'sling-web-component-brand-icon';

export class Table extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  get srccolumns() {
    return this._srccolumns;
  }

  set srccolumns(value) {
    this._srccolumns = value;
    this.render();
  }

  get srcdata() {
    return this._srcdata;
  }

  set srcdata(value) {
    this._srcdata = value;
    this.render();
  }

  get editable() {
    return this.hasAttribute('editable');
  }

  set editable(value) {
    if (value != null && value !== false) {
      this.setAttribute('editable', '');
    } else {
      this.removeAttribute('editable');
    }
    this.render();
  }

  get noheader() {
    return this.hasAttribute('noheader');
  }

  set noheader(value) {
    if (value != null && value !== false) {
      this.setAttribute('noheader', '');
    } else {
      this.removeAttribute('noheader');
    }
    this.render();
  }

  get clickablerows() {
    return this.hasAttribute('clickablerows');
  }

  set clickablerows(value) {
    if (value != null && value !== false) {
      this.setAttribute('clickablerows', '');
    } else {
      this.removeAttribute('clickablerows');
    }
    this.render();
  }

  static get observedAttributes() {
    return ['editable'];
  }

  static tableCellInfoFormatter(item, header, isSecondaryField) {
    let fieldItem = item[header.field];
    let headerType = header.type || '';
    let cell = '---';

    // change to secondary field formatter if true
    if (isSecondaryField) {
      fieldItem = item[header.secondaryField];
      headerType = header.secondaryType;
    }

    // function passed as column cell formatter
    if (typeof (headerType) === 'function') {
      return headerType(item);
    }

    if (fieldItem != null) {
      switch (headerType) {
        case 'date': {
          cell = formatDate(fieldItem);
          break;
        }
        case 'time': {
          cell = formatTime(fieldItem);
          break;
        }
        case 'dateTime': {
          const date = formatDate(fieldItem);
          const time = formatTime(fieldItem);
          cell = `<span>${date} às ${time}</span>`;
          break;
        }
        case 'currency': {
          const value = formatCurrencyWithoutSymbol(fieldItem);
          const valueClass = fieldItem < 0 ? 'emd-table__value_negative' : '';
          cell = `
            <div class="emd-table__currency">
              <span class="emd-table__symbol">${'R$'}</span>
              <span class="emd-table__value ${valueClass}">${value}</span>
            </div>
          `;
          break;
        }
        case 'installment': {
          cell = `
            <span>${fieldItem.toString().concat('x')}</span>
          `;
          break;
        }
        case 'cpf': {
          const cpfMask = imask.createMask({
            mask: '000.000.000-00',
          });
          cell = cpfMask.resolve(fieldItem);
          break;
        }
        case 'cnpj': {
          const cnpjMask = imask.createMask({
            mask: '00.000.000/0000-00',
          });
          cell = cnpjMask.resolve(fieldItem);
          break;
        }
        case 'brand_icon': {
          cell = `
            <sling-brand-icon brandid="${fieldItem}" width="50px" height="25px"></sling-brand-icon>
          `;
          break;
        }
        case 'phone': {
          let phoneMask;
          switch (fieldItem.length) {
            case 8: {
              phoneMask = imask.createMask({
                mask: '0000-0000',
              });
              break;
            }
            case 9: {
              phoneMask = imask.createMask({
                mask: '00000-0000',
              });
              break;
            }
            case 10: {
              phoneMask = imask.createMask({
                mask: '(00)0000-0000',
              });
              break;
            }
            default: {
              phoneMask = imask.createMask({
                mask: '(00)00000-0000',
              });
            }
          }
          cell = phoneMask.resolve(fieldItem);
          break;
        }
        default: {
          cell = fieldItem;
        }
      }
    }
    return cell;
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === 'editable' && oldValue !== newValue) {
      this.clickablerows = newValue;
    }
  }

  handleRowClick(index) {
    const { srcdata: dataSource = [] } = this;

    const item = index != null
      ? dataSource[index]
      : null;

    return () => {
      if (item != null && this.clickablerows) {
        this.dispatchEventAndMethod('rowclicked', item);
      }
    };
  }

  dispatchEventAndMethod(evtName, detail) {
    const event = new CustomEvent(evtName, {
      bubbles: true,
      detail,
    });

    const method = this[`on${evtName}`];

    this.dispatchEvent(event);

    if (typeof method === 'function') {
      method(event);
    }
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.ignoreRowClicks();
  }

  listenForRowClicks() {
    this.listenForOrIgnoreRowClicks('addEventListener');
  }

  ignoreRowClicks() {
    this.listenForOrIgnoreRowClicks('removeEventListener');
  }

  listenForOrIgnoreRowClicks(methodName) {
    const $trs = this.shadowRoot.querySelectorAll('tr');

    Array.from($trs).forEach(($tr) => {
      $tr[methodName]('click',
        this.handleRowClick($tr.dataset.index));
    });
  }

  static getEditCell() {
    return `
    <td class="emd-table__cell emd-table__icon">
      <svg width="18px" height="18px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="20.5 20.60000228881836 55 54.89999771118164"
        style="enable-background:new 0 0 96 96;" xml:space="preserve">
        <g id="XMLID_2_">
          <path id="XMLID_6_" class="edit-icon" d="M20.5,64v11.5H32l33.8-33.8L54.3,30.2L20.5,64z M74.6,32.9c1.2-1.2,1.2-3.1,0-4.3l-7.1-7.1
            c-1.2-1.2-3.1-1.2-4.3,0L57.6,27L69,38.4L74.6,32.9z"></path>
        </g>
      </svg>
    </td>
    `;
  }

  render() {
    const {
      srcdata: dataSource = [],
      srccolumns: columns = [],
      noheader: noHeader,
      clickablerows: clickableRows,
    } = this;

    this.shadowRoot.innerHTML = `
      <style>
        @import url('sling-web-component-table/src/index.css');
      </style>
      <table class="emd-table${clickableRows ? ' emd-table_clickablerows' : ''}">
        <colgroup>
          ${columns.map(item => `<col style="width: ${item.width || 'auto'};"></col>`).join('')}
          ${this.editable ? '<col></col>' : ''}
        </colgroup>
        <thead class="emd-table__header${noHeader ? ' emd-table__header_hidden' : ''}">
          <tr>
            ${columns.map(item => `<th
              class="emd-table__title"
              style="text-align: ${item.align || 'left'};">
              ${item.title}
            </th>`).join('')}
            ${this.editable ? '<th class="emd-table__title"></th>' : ''}
          </tr>
        </thead>
        <tbody class="emd-table__body">
          ${dataSource.map((item, index) => `
            <tr data-index="${index}" class="emd-table__row emd-table_row_success">
              ${columns.map(header => `<td
                class="emd-table__cell"
                style="text-align: ${header.align || 'left'};">
                <span class="emd-table__content emd-table__content_primary">
                ${this.constructor.tableCellInfoFormatter(item, header, false)}
                </span>
                ${header.secondaryField ? `
                  <span
                    class="emd-table__content emd-table__content_secondary">
                    ${this.constructor.tableCellInfoFormatter(item, header, true)}
                  </span>
                ` : ''}
              </td>`).join('')}
              ${this.editable ? this.constructor.getEditCell() : ''}
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    this.listenForRowClicks();
  }
}
