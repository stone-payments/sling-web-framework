import { SlingElement, html } from 'sling-framework';

export class Label extends SlingElement {
  static get properties() {
    return {
      
    };
  }

  render({ disabled, type }) {
    
    return html`
      <style>
        @import url('sling-web-component-label/src/index.css');
      </style>
      <span class="common-label red-label">LABEL</span>
      <span class="common-label yellow-label">LABEL</span>
      <span class="common-label gray-label">LABEL</span>
      <span class="common-label green-label">LABEL</span>
      <span class="common-label purple-label">LABEL</span>

      <span class="common-label red-outline-label">LABEL</span>
      <span class="common-label yellow-outline-label">LABEL</span>
      <span class="common-label gray-outline-label">LABEL</span>
      <span class="common-label green-outline-label">LABEL</span>
      <span class="common-label purple-outline-label">LABEL</span>
    `;
  }
}
