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
  'value',
  'validationstatus',
  'validationhook',
];

const PROPS = [...BOOLEAN_PROPS, ...STRING_PROPS];

export const Field = Base => class extends Base {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
        @import url('sling-web-component-field/src/index.css');
      </style>
      <div class="emd-field">
        <input class="emd-field__input">
        <sling-icon
          class="emd-field__icon emd-field__icon_validating"
          icon="ellipsis"></sling-icon>
        <sling-icon
          class="emd-field__icon emd-field__icon_error"
          icon="warning"></sling-icon>
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

  attributeChangedCallback(attrName, previousValue, nextValue) {
    if (PROPS.includes(attrName) && previousValue !== nextValue) {
      this.inputElement[attrName] = nextValue;
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
    this.value = evt.target.value;
  }
};
