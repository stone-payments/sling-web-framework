import { html, SlingElement } from 'sling-framework';

export class InfoTooltip extends SlingElement {
  static get properties() {
    return {
     
    };
  }

  render() {
    return html`
      <style>
        @import url('sling-web-component-info-tooltip/src/index.css');
      </style>
      
      <sling-tooltip  position="right" tooltiptext="Tooltip">Hover me</sling-tooltip>
    `;
  }
}
