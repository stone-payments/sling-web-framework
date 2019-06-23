import { setAttr } from '@stone-payments/emd-helpers';
import { currencyFormatter, moneyFormatter } from '@stone-payments/emd-formatters';
import { render } from '@stone-payments/lit-html';

export const MoneyController = (Base = class {}) => class extends Base {
  static getStyleProperty (domEl, prop) {
    return getComputedStyle(domEl).getPropertyValue(prop);
  }

  static currencyFormatter (...args) {
    return currencyFormatter(...args);
  }

  static moneyFormatter (...args) {
    return moneyFormatter(...args);
  }

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

    this._updateTypography();
    this._updateView();
  }

  get currency () {
    return this.getAttribute('currency');
  }

  set currency (value) {
    setAttr(this, 'currency', value);
  }

  get value () {
    return Number(this.getAttribute('value'));
  }

  set value (value) {
    setAttr(this, 'value', value);
  }

  get colorblock () {
    return this.hasAttribute('colorblock');
  }

  set colorblock (value) {
    setAttr(this, 'colorblock', value);
  }

  static get observedAttributes () {
    return [
      'style',
      'class',
      'currency',
      'value',
      'colorblock'
    ];
  }

  attributeChangedCallback (attrName, ...args) {
    if (super.attributeChangedCallback) {
      super.attributeChangedCallback(attrName, ...args);
    }

    if (attrName === 'style' || attrName === 'class') {
      this._updateTypography();
    }

    this._updateView();
  }

  get formattedCurrency () {
    return this.currency
      ? this.constructor.currencyFormatter(this.currency)
      : undefined;
  }

  get formattedValue () {
    return this.constructor.moneyFormatter(this.value);
  }

  _updateTypography () {
    const computedFontSize = this.constructor
      .getStyleProperty(this, 'font-size');

    const fontSizeInPixels = parseFloat(computedFontSize);

    if (fontSizeInPixels <= 12) {
      this.currencyProportion = 10 / 12;
    } else if (fontSizeInPixels >= 24) {
      this.currencyProportion = 2 / 3;
    } else {
      this.currencyProportion = 3 / 4;
    }

    this.currencyMargin = 1 - (0.5 / this.currencyProportion);
  }

  _updateView () {
    this.renderer(this.render(), this.renderRoot);
  }

  render () {
    return this.currentView.apply(this);
  }
};
