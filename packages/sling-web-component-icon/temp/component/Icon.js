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
        .emd-icon {
  display: block;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
}

.emd-icon > svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  fill: currentColor;
}

:host {
  position: relative;
  display: inline-block;
  width: 24px;
  height: auto !important;
  background: transparent !important;
}

/* for compatibility */

sling-icon {
  position: relative;
  display: inline-block;
  width: 24px;
  height: auto !important;
  background: transparent !important;
}

      </style>
      <div class="emd-icon">
        ${this.constructor.getIconSvg(icon)}
      </div>
    `;
  }
}
