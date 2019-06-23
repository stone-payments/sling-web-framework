import { toString } from '@stone-payments/emd-helpers';
import { render } from '@stone-payments/lit-html';

export const FieldController = (Base = class {}) => class extends Base {
  constructor () {
    super();
    this.attachShadow({ mode: 'open' });
    this.renderRoot = this.shadowRoot;
    this.renderer = render;

    this._handleMaskedValueUpdate = this._handleMaskedValueUpdate.bind(this);
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
      this.field.value = nextValue;

      if (this.mask) {
        this.mask.setRawValue(nextValue);
      } else {
        this.dispatchEventAndMethod('update', nextValue);
      }
    }
  }

  _handleFieldInput (evt) {
    if (!this.mask) {
      this.dispatchEventAndMethod('update', this.field.value);
    }
    evt.stopPropagation();
  }

  _handleFieldChange (evt) {
    evt.stopPropagation();
  }

  _handleMaskedValueUpdate ({ target }) {
    this.dispatchEventAndMethod('update', target.rawValue);
  }

  _updateView () {
    this.renderer(this.render(), this.renderRoot);
  }

  render () {
    return this.currentView.apply(this);
  }
};
