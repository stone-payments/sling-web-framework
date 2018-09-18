import { SlingElement, html } from 'sling-framework';

export class Button extends SlingElement {
  static get properties() {
    return {
      layout: {
        type: String,
        reflectToAttribute: true,
      },
      color: {
        type: String,
        reflectToAttribute: true,
      },
      size: {
        type: String,
        reflectToAttribute: true,
      },
      disabled: {
        type: Boolean,
        reflectToAttribute: true,
      },
      slim: {
        type: Boolean,
        reflectToAttribute: true,
      },
      type: {
        type: String,
        reflectToAttribute: true,
      },
    };
  }

  render({ disabled, type }) {
    const base = 'emd-btn';
    const attrNames = Object.keys(this.constructor.properties);
    const className = this.generateClassName(base, attrNames);

    return html`
      <style>
        @import url('sling-web-component-button/src/index.css');
      </style>
      <button type="${type}" className="${className}" disabled=${disabled}>
        <slot></slot>
      </button>
    `;
  }
}
