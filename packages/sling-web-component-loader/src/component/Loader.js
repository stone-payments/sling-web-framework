import { SlingElement, html } from '../../node_modules/sling-web-framework/src/index.js';

export class Loader extends SlingElement {
  static get properties() {
    return {
      loading: {
        type: Boolean,
        reflectToAttribute: true,
      },
    };
  }

  render() {
    const base = 'emd-loader';
    const attrNames = Object.keys(this.constructor.properties);
    const className = this.generateClassName(base, attrNames);

    return html`
      <style>
        @import url('../sling-web-component-loader/src/index.css');
      </style>
      <div className="${className}">
        <div class="emd-loader__inner"></div>
      </div>
    `;
  }
}
