import { html, SlingElement } from 'sling-framework';
import 'sling-web-component-menu-item';

export class Menu extends SlingElement {
  static get properties() {
    return {
      layout: {
        type: String,
        reflectToAttribute: true,
      },
      size: {
        type: String,
        reflectToAttribute: true,
      },
      icononly: {
        type: String,
        reflectToAttribute: true,
      },
    };
  }

  render() {
    return html`
      <style>
        @import url('sling-web-component-menu/src/index.css');
      </style>
      <div class="sling-menu">
        <slot></slot>
      </div>
    `;
  }
}
