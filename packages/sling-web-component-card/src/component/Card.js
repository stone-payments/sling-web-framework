import { html, SlingElement } from 'sling-framework';

export const applySlotClass = (area, isVisible, hidePadding) => {
  const base = 'emd-card__slot';

  return `${base} ${base}_${area}` +
    `${isVisible ? ` ${base}_visible` : ` ${base}_hidden`}` +
    `${hidePadding ? ` ${base}_nopadding` : ''}`;
};

export class Card extends SlingElement {
  static get properties() {
    return {
      nopadding: {
        type: Boolean,
        reflectToAttribute: true,
      },
      nopaddingheader: {
        type: Boolean,
        reflectToAttribute: true,
      },
      nopaddingbody: {
        type: Boolean,
        reflectToAttribute: true,
      },
      nopaddingfooter: {
        type: Boolean,
        reflectToAttribute: true,
      },
      backgroundheader: {
        type: String,
        reflectToAttribute: true,
      },
      nodivisors: {
        type: Boolean,
        reflectToAttribute: true,
      },
      showheader: {
        type: String,
        reflectToAttribute: false,
      },
      showbody: {
        type: String,
        reflectToAttribute: false,
      },
      showfooter: {
        type: String,
        reflectToAttribute: false,
      },
    };
  }

  connectedCallback() {
    if (typeof super.connectedCallback === 'function' && this.childrenUpdated) {
      super.connectedCallback();
      const fn = this.childrenUpdated.bind(this);
      this._mo = new MutationObserver(fn);
      this._mo.observe(this, { childList: true });
      fn();
    }
  }

  disconnectedCallback() {
    if (typeof super.disconnectedCallback === 'function') {
      super.disconnectedCallback();
      this._mo.disconnect();
    }
  }

  childrenUpdated() {
    this.visibleSlots = Array.from(this.children).map($el => $el.slot);
    this.showheader = this.visibleSlots.includes('header');
    this.showbody = this.visibleSlots.includes('');
    this.showfooter = this.visibleSlots.includes('footer');
  }

  render() {
    const {
      showheader,
      showbody,
      showfooter,
      nopadding,
      nopaddingheader,
      nopaddingbody,
      nopaddingfooter,
      nodivisors,
      backgroundheader,
    } = this;

    return html`
      <style>
        @import url('sling-web-component-card/src/index.css');
      </style>
      <div className="emd-card${nodivisors ? ' emd-card_nodivisors' : ''}">
        <div
          className="${applySlotClass('header', showheader, nopadding || nopaddingheader)}"
          style="${backgroundheader ? `background: ${backgroundheader}` : ''}">
          <slot name="header" class="emd-card__slot"></slot>
        </div>
        <div
          className="${applySlotClass('body', showbody, nopadding || nopaddingbody)}">
          <slot class="emd-card__slot"></slot>
        </div>
        <div
          className="${applySlotClass('footer', showfooter, nopadding || nopaddingfooter)}">
          <slot name="footer" class="emd-card__slot"></slot>
        </div>
      </div>
    `;
  }
}
