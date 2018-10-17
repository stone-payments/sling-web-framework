import { html, SlingElement } from 'sling-framework';

export class Tooltip extends SlingElement {
  static get properties() {
    return {
      position: {
        type: String,
        reflectToAttribute: true,
      },
      tooltiptext:{
        type: String,
        reflectToAttribute: true,
      }
    };
  }

  render() {
    console.log(this.position);
    return html`
      <style>
        @import url('sling-web-component-tooltip/src/index.css');
      </style>
      
      <div class="tooltip">
      <slot></slot>
        <span className="tooltiptext ${this.position || 'right'}">${this.tooltiptext}</span>
      </div>
    `;
  }
}
