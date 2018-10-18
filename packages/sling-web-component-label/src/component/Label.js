import { SlingElement, html } from 'sling-framework';
import 'sling-web-component-icon';

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
      imageName: {
        type: String,
        reflectToAttribute: true,
      },
      showBullet: {
        type: Boolean,
        reflectToAttribute: true,
      },
    };
  }

  constructor() {
    super();
    this.type = 'fill';
    this.color = 'green';
    this.size = 'small';
    this.imageName = '';
    this.showBullet = false;
  }

  render() {
    let image;

    if (this.imageName.length > 0) {
      image = html`<sling-icon className="icons md-${this.size}" icon="${this.imageName}"></sling-icon>`;
    }

    return html`
      <style>
        @import url('sling-web-component-label/src/index.css');
      </style>
      <span className="common-label ${this.size}-label ${this.color}-${this.type}-label bullet-label-${this.showBullet}">
        ${image}
        <slot></slot>
      </span>
    `;
  }
}
