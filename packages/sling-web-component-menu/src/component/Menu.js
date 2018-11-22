import { html, SlingElement } from 'sling-framework';
import 'sling-web-component-icon';

export class Menu extends SlingElement {
  static get properties() {
    return {
      layout: {
        type: String,
        reflectToAttribute: true,
      },
      aim: {
        type: String,
        reflectToAttribute: true,
      },
      size: {
        type: String,
        reflectToAttribute: true,
      },
    };
  }

  render() {
    const base = 'emd-snackbar';
    const attrNames = Object.keys(this.constructor.properties);
    const className = this.generateClassName(base, attrNames);

    return html`
      <style>
        @import url('sling-web-component-menu/src/index.css');
      </style>
      <div></div>
    `;
  }
}
