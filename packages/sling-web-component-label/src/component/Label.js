import { SlingElement, html } from 'sling-framework';

export class Label extends SlingElement {
  static get properties() {
    return {
      type: {
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
    };
  }

  constructor() {
    super();
    this.type = 'fill';
    this.color = 'green';
    this.size = 'small';
  }

  render() {
    return html`
      <style>
        @import url('sling-web-component-label/src/index.css');
      </style>
      <span className="common-label ${this.size}-label ${this.color}-${this.type}-label"><slot></slot></span>
    `;
  }
}
