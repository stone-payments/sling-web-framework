import { SlingElement, html } from '../../node_modules/sling-web-framework/src/index.js';
import '../../node_modules/sling-web-component-loader/src/index.js';

export class LoaderWrapper extends SlingElement {
  static get properties() {
    return {
      loading: {
        type: Boolean,
        reflectToAttribute: true,
      },
    };
  }

  render() {
    return html`
      <style>
        @import url('../sling-web-component-loader-wrapper/src/index.css');
      </style>
      <div className="emd-loader-wrapper${this.loading ? ' emd-loader-wrapper_loading' : ''}">
        <sling-loader loading="${this.loading}"></sling-loader>  
        <slot></slot>
      </div>
    `;
  }
}
