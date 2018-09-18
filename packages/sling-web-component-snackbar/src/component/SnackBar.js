import { html, SlingElement } from 'sling-framework';
import 'sling-web-component-icon';
import 'sling-web-component-button';

export class SnackBar extends SlingElement {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

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
      closeable: {
        type: Boolean,
        reflectToAttribute: true,
      },
    };
  }

  handleClick() {
    this.dispatchEventAndMethod('closeclick');
  }

  _render() {
    const base = 'emd-snackbar';
    const attrNames = Object.keys(this.constructor.properties);
    const className = this.generateClassName(base, attrNames);

    return html`
      <style>
        @import url('../sling-web-component-snackbar/src/index.css');
      </style>
      <div className="${className}">
        <sling-icon class="emd-snackbar_icon" icon="${this.aim || 'info'}"></sling-icon>
        <div class="emd-snackbar_list">
          <div class="emd-snackbar_item"><slot></slot></div>
        </div>
        ${this.closeable ? html`
          <sling-button layout="text" onclick="${this.handleClick}">
            <sling-icon class="emd-snackbar_close" icon="close"></sling-icon>
          </sling-button>
        ` : ''}
      </div>
    `;
  }
}
