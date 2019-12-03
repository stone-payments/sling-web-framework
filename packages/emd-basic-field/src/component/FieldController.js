import { toString } from '@stone-payments/emd-helpers';
import { render } from '@stone-payments/lit-html';

export const FieldController = (Base = class {}) => class extends Base {
  constructor () {
    super();
    this.attachShadow({ mode: 'open' });
    this.renderRoot = this.shadowRoot;
    this.renderer = render;
  }

  connectedCallback () {
    this._upgradeProperty('value');
    super.connectedCallback();
  }

  get field () {
    return this.renderRoot.querySelector('input');
  }

  get value () {
    return this._processedFieldValue;
  }

  set value (value) {
    const pastValue = this._processedFieldValue;
    const nextValue = toString(value);

    if (!this.field) {
      this._initialValue = value;
    } else if (pastValue !== nextValue) {
      if (!this.mask) {
        this.field.value = nextValue;
      } else {
        this.mask.unmaskedValue = nextValue;
      }
      this.dispatchEventAndMethod('update', nextValue);
      this._handleFieldValidation(nextValue);
    }
  }

  _handleFieldInput (evt) {
    const value = !this.mask
      ? this.field.value
      : this.mask.unmaskedValue;

    this.dispatchEventAndMethod('update', value);
    this._handleFieldValidation(value);
    evt.stopPropagation();
  }

  _handleFieldChange (evt) {
    evt.stopPropagation();
  }

  _updateView () {
    this.renderer(this.render(), this.renderRoot);
  }

  render () {
    return this.currentView.apply(this);
  }
};
