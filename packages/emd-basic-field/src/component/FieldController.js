import { toString, isFunction, isPromise } from '@stone-payments/emd-helpers';
import { render } from '@stone-payments/lit-html';

const VALIDATION_START = 'validationstart';
const VALIDATION = 'validation';
const VALIDATION_END = 'validationend';

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

  _handleFieldValidation (value) {
    if (isFunction(this.validation)) {
      if (this._previousValidation && this._previousValidation.cancel) {
        this._previousValidation.cancel();
        this.dispatchEventAndMethod(VALIDATION_END);
      }

      this.dispatchEventAndMethod(VALIDATION_START);
      const validationResult = this.validation(value);

      if (isPromise(validationResult)) {
        this._previousValidation = validationResult;

        validationResult.then(result => {
          this._previousValidation = undefined;
          this.dispatchEventAndMethod(VALIDATION, result);
          this.dispatchEventAndMethod(VALIDATION_END);
        });

        return undefined;
      }

      this.dispatchEventAndMethod(VALIDATION, validationResult);
      this.dispatchEventAndMethod(VALIDATION_END);
    }
  }

  _updateView () {
    this.renderer(this.render(), this.renderRoot);
  }

  render () {
    return this.currentView.apply(this);
  }
};
