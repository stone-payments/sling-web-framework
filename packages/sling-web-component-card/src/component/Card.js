import { html, SlingElement } from 'sling-framework';

export const applySlotClass = (area, isVisible, hasPadding) => {
  const base = 'emd-card__slot';

  return `${base} ${base}_${area}` +
    `${isVisible ? ` ${base}_visible` : ` ${base}_hidden`}` +
    `${hasPadding ? ` ${base}_nopadding` : ''}`;
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
    };
  }

  render() {
    const {
      nopadding,
      nopaddingheader,
      nopaddingbody,
      nopaddingfooter,
    } = this;

    this.visibleSlots = Array.from(this.children).map($el => $el.slot);
    const showHeader = this.visibleSlots.includes('header');
    const showBody = this.visibleSlots.includes('');
    const showFooter = this.visibleSlots.includes('footer');

    return html`
      <style>
        @import url('sling-web-component-card/src/index.css');
      </style>
      <div class="emd-card">
        <div className="${applySlotClass('header', showHeader, nopadding || nopaddingheader)}">
          <slot name="header" class="emd-card__slot"></slot>
        </div>
        <div className="${applySlotClass('body', showBody, nopadding || nopaddingbody)}">
          <slot class="emd-card__slot"></slot>
        </div>
        <div className="${applySlotClass('footer', showFooter, nopadding || nopaddingfooter)}">
          <slot name="footer" class="emd-card__slot"></slot>
        </div>
      </div>
    `;
  }
}
