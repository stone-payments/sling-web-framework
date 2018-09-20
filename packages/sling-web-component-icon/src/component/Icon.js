import { icons } from 'sling-assets';

export class Icon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['icon'];
  }

  get icon() {
    return this.getAttribute('icon');
  }

  set icon(value) {
    this.setAttribute('icon', value);
  }

  connectedCallback() {
    this.render(this);
  }

  attributeChangedCallback() {
    this.render(this);
  }

  static getIconSvg(icon) {
    const iconsMap = {
      success: icons.CHECK_CIRCLE,
      danger: icons.CANCEL,
      close: icons.CLOSE,
      warning: icons.ERROR,
      info: icons.FEEDBACK,
    };

    return iconsMap[icon] != null
      ? iconsMap[icon]
      : undefined;
  }

  render({ icon }) {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('sling-web-component-icon/src/index.css');
      </style>
      <div class="emd-icon">
        ${this.constructor.getIconSvg(icon)}
      </div>
    `;
  }
}
