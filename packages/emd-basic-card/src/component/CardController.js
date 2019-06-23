import { setAttr } from '@stone-payments/emd-helpers';
import { render } from '@stone-payments/lit-html';

export const CardController = (Base = class {}) => class extends Base {
  constructor () {
    super();
    this.attachShadow({ mode: 'open' });
    this.renderRoot = this.shadowRoot;
    this.renderer = render;
  }

  connectedCallback () {
    if (super.connectedCallback) {
      super.connectedCallback();
    }

    this._updateView();
  }

  childrenUpdatedCallback () {
    const filledSlots = Array.from(this.children).map(item => item.slot || '');
    const isFilled = slotName => filledSlots.includes(slotName);

    this.showHeader = ['header', 'header-extra'].some(isFilled);
    this.showBody = isFilled('');
    this.showFooter = isFilled('footer');

    this._updateView();
  }

  get expandedbody () {
    return this.hasAttribute('expandedbody');
  }

  set expandedbody (value) {
    setAttr(this, 'expandedbody', value);
  }

  static get observedAttributes () {
    return ['expandedbody'];
  }

  attributeChangedCallback (...args) {
    if (super.attributeChangedCallback) {
      super.attributeChangedCallback(...args);
    }
    this._updateView();
  }

  _updateView () {
    this.renderer(this.render(), this.renderRoot);
  }

  render () {
    return this.currentView.apply(this);
  }
};
