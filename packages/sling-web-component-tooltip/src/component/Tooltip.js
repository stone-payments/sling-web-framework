import { html, SlingElement } from 'sling-framework';

export class Tooltip extends SlingElement {
  static get properties() {
    return {
    };
  }

  render() {
    // const {
    //   nopadding,
    //   nopaddingheader,
    //   nopaddingbody,
    //   nopaddingfooter,
    // } = this;


    return html`
      <style>
        @import url('sling-web-component-tooltip/src/index.css');
      </style>
      <div >
      </div>
    `;
  }
}
