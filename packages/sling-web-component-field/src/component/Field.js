import { withEventDispatch } from 'sling-framework';
import { setAttr, isFunction } from 'sling-helpers';
import 'sling-web-component-icon';
import { withRequired } from './withRequired.js';

const BOOLEAN_PROPS = [
  'disabled',
  'required',
  'readonly',
  'validating',
];

const STRING_PROPS = [
  'autocomplete',
  'type',
  'name',
  'id',
  'placeholder',
  'validationstatus',
  'validationhook',
];

const CUSTOM_SETTER_PROPS = [
  'value',
];

const PROPS = [
  ...BOOLEAN_PROPS,
  ...STRING_PROPS,
  ...CUSTOM_SETTER_PROPS,
];

export const Field = Base => class extends withEventDispatch(Base) {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
        @import url('sling-web-component-field/src/index.css');
      </style>
      <div class="emd-field">
        <input class="emd-field__input">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32" height="8" viewBox="0 0 32 8"
          class="emd-field__icon emd-field__icon_validating">
          <circle cx="4" cy="4" r="4"></circle>
          <circle cx="16" cy="4" r="4"></circle>
          <circle cx="28" cy="4" r="4"></circle>
        </svg>
        <sling-icon
          class="emd-field__icon emd-field__icon_error"
          icon="danger"></sling-icon>
        <sling-icon
          class="emd-field__icon emd-field__icon_success"
          icon="success"></sling-icon>
      </div>
    `;

    BOOLEAN_PROPS.forEach((propName) => {
      Object.defineProperty(this, propName, {
        get() { return this.hasAttribute(propName); },
        set(value) { setAttr(this, propName, value); },
      });
    });

    STRING_PROPS.forEach((propName) => {
      Object.defineProperty(this, propName, {
        get() { return this.getAttribute(propName); },
        set(value) { setAttr(this, propName, value); },
      });
    });

    this.handleInput = this.handleInput.bind(this);
  }

  static get observedAttributes() {
    return PROPS;
  }

  get inputElement() {
    return this.shadowRoot.querySelector('input');
  }

  get validation() {
    const noop = () => undefined;
    const validatorFn = this._validation || this.defaultValidation || noop;

    return (this.hasAttribute('required'))
      ? withRequired(validatorFn)
      : validatorFn;
  }

  set validation(value) {
    this._validation = value;
  }

  get value() {
    return this.getAttribute('value');
  }

  set value(value) {
    if (this.getAttribute('value') !== value) {
      setAttr(this, 'value', value);
      this.dispatchEventAndMethod('update', value);
    }
  }

  attributeChangedCallback(attrName, previousValue, nextValue) {
    if (PROPS.includes(attrName) && previousValue !== nextValue) {
      setAttr(this.inputElement, attrName, nextValue);
    }
  }

  connectedCallback() {
    this.inputElement.addEventListener('input', this.handleInput);
  }

  disconnectedCallback() {
    this.inputElement.removeEventListener('input', this.handleInput);
  }

  updateDefaultValidationAndMask(validatorFn, maskFn) {
    const noop = () => undefined;
    this.defaultValidation = isFunction(validatorFn) ? validatorFn : noop;

    if (this.mask && isFunction(this.mask.destroy)) {
      this.mask.destroy();
    }

    if (isFunction(maskFn)) {
      this.mask = maskFn(this.inputElement);
    }
  }

  handleInput(evt) {
    if (this.value !== evt.target.value) {
      this.value = evt.target.value;
    }
  }
};
