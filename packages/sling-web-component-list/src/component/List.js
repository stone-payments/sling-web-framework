import { html, SlingElement } from '../../node_modules/sling-web-framework/src/index.js';

export class List extends SlingElement {
  static get properties() {
    return {
      srcdata: Array,
      srckeys: Array,
      cascadelist: {
        type: Boolean,
        reflectToAttribute: true,
      },
    };
  }

  render() {
    const data = this.srcdata || [];
    const keys = this.srckeys || [];

    return html`
      <style>
        @import url('../sling-web-component-list/src/index.css');
      </style>
      ${data.map(list => html`
        <ul className="list-view ${this.cascadelist ? 'list-view_cascade' : ''}">
        ${Object.values(list).map((item, index) => html`
          <li class="list-view__row">
            <span class="list-view__key">
              ${keys[index]}${this.cascadelist ? '' : ':'}
            </span>
            <span class="list-view__value">${item != null ? item : '---'}</span>
          </li>
        `)}
        </ul>
      `)}
    `;
  }
}
