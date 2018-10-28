import { icons } from 'sling-assets';

export class BrandIcon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static parseUnit(value) {
    if (value == null) {
      return 'auto';
    }

    return (value.includes('%') || value.includes('px'))
      ? value
      : `${value}px`;
  }

  get brandid() {
    return Number(this.getAttribute('brandid'));
  }

  set brandid(value) {
    if (value != null && value !== false) {
      this.setAttribute('brandid', value);
    } else {
      this.removeAttribute('brandid');
    }
    this.render(this);
  }

  get width() {
    return this.getAttribute('width');
  }

  set width(value) {
    if (value != null && value !== false) {
      this.setAttribute('width', value);
    } else {
      this.removeAttribute('width');
    }
    this.render(this);
  }

  get height() {
    return this.getAttribute('height');
  }

  set height(value) {
    if (value != null && value !== false) {
      this.setAttribute('height', value);
    } else {
      this.removeAttribute('height');
    }
    this.render(this);
  }

  connectedCallback() {
    this.render();
  }

  getSvg() {
    switch (this.brandid) {
      case 1: // visa
        return icons.VISA;
      case 2: // mastercard
        return icons.MASTERCARD;
      case 3: // americanexpress
        return icons.AMERICAN_EXPRESS;
      case 5: // ticket
        return icons.TICKET;
      case 6: // sodexo
        return icons.SODEXO;
      case 7: // VR
        return icons.VR;
      case 8: // alelo
        return icons.ALELO;
      case 9: // hipercard
        return icons.HIPERCARD;
      case 12: // senff
        return icons.SENFF;
      case 171: // elo
        return icons.ELO;
      default: // stone
        return icons.STONE;
    }
  }

  render() {
    const customStyle = `width: ${this.constructor.parseUnit(this.width)}; ` +
      `height: ${this.constructor.parseUnit(this.height)};`;

    this.shadowRoot.innerHTML = `
      <div class="brand" style="${customStyle}">${this.getSvg()}</div>
    `;
  }
}
