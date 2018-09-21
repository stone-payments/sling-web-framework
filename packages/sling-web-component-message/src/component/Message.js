import { html, SlingElement } from 'sling-framework';

export class Message extends SlingElement {
  static get properties() {
    return {
      srcdata: Array,
      layout: {
        type: String,
        reflectToAttribute: true,
      },
      aim: {
        type: String,
        reflectToAttribute: true,
      },
    };
  }

  getMessageTypeIcon() {
    switch (this.aim) {
      case 'error': {
        return html`
        <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs>
            <path d="M12,2 C6.47,2 2,6.47 2,12 C2,17.53 6.47,22 12,22 C17.53,22 22,17.53 22,12 C22,6.47 17.53,2 12,2 Z M17,15.59 L15.59,17 L12,13.41 L8.41,17 L7,15.59 L10.59,12 L7,8.41 L8.41,7 L12,10.59 L15.59,7 L17,8.41 L13.41,12 L17,15.59 Z" id="path-1"></path>
          </defs>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="icon/cancel" transform="translate(-2.000000, -2.000000)">
              <mask id="mask-2" fill="white">
                  <use xlink:href="#path-1"></use>
              </mask>
              <use class="shape" fill-rule="nonzero" xlink:href="#path-1"></use>
            </g>
          </g>
        </svg>`;
      }
      case 'success': {
        return html`
        <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs>
              <path d="M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z M10,17 L5,12 L6.41,10.59 L10,14.17 L17.59,6.58 L19,8 L10,17 Z" id="path-1"></path>
          </defs>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="icon/Sucesso" transform="translate(-2.000000, -2.000000)">
                  <mask id="mask-2" fill="white">
                      <use xlink:href="#path-1"></use>
                  </mask>
                  <use class="shape" fill-rule="nonzero" xlink:href="#path-1"></use>
              </g>
          </g>
        </svg>`;
      }
      case 'alert': {
        return html`
        <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs>
              <path d="M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z M13,17 L11,17 L11,15 L13,15 L13,17 Z M13,13 L11,13 L11,7 L13,7 L13,13 Z" id="path-1"></path>
          </defs>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="icon/error" transform="translate(-2.000000, -2.000000)">
                  <mask id="mask-2" fill="white">
                      <use xlink:href="#path-1"></use>
                  </mask>
                  <use class="shape" fill-rule="nonzero" xlink:href="#path-1"></use>
              </g>
          </g>
        </svg>`;
      }
      case 'standby': {
        return html`
        <svg width="22px" height="15px" viewBox="0 0 22 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs>
              <path d="M12,5 C7,5 2.73,8.11 1,12.5 C2.73,16.89 7,20 12,20 C17,20 21.27,16.89 23,12.5 C21.27,8.11 17,5 12,5 Z M12,17.5 C9.24,17.5 7,15.26 7,12.5 C7,9.74 9.24,7.5 12,7.5 C14.76,7.5 17,9.74 17,12.5 C17,15.26 14.76,17.5 12,17.5 Z M12,9.5 C10.34,9.5 9,10.84 9,12.5 C9,14.16 10.34,15.5 12,15.5 C13.66,15.5 15,14.16 15,12.5 C15,10.84 13.66,9.5 12,9.5 Z" id="path-1"></path>
          </defs>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="icon/visualizar" transform="translate(-1.000000, -5.000000)">
                  <mask id="mask-2" fill="white">
                      <use xlink:href="#path-1"></use>
                  </mask>
                  <use class="shape" fill-rule="nonzero" xlink:href="#path-1"></use>
              </g>
          </g>
        </svg>`;
      }
      default: {
        return '';
      }
    }
  }

  render() {
    const data = this.srcdata || [];
    const base = 'emd-message';
    const attrNames = Object.keys(this.constructor.properties);
    attrNames.splice('srcdata', 1);
    const className = this.generateClassName(base, attrNames);

    return html`
      <style>
        @import url('sling-web-component-message/src/index.css');
      </style>
      <div className="${className}" style="${!data.length ? 'display: none' : ''}">
        ${this.getMessageTypeIcon()}
        <ul class="emd-message_list">
          ${data.map(item => html`
            <li class="emd-message_item">${item}</li>
          `)}
        </ul>
      </div>
    `;
  }
}
