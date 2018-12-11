import { setAttr } from 'sling-helpers';
import { withRequired } from './withRequired.js';

const BOOLEAN_PROPS = [
  'autocomplete',
  'disabled',
  'required',
  'readonly',
];

const STRING_PROPS = [
  'type',
  'name',
  'id',
  'placeholder',
  'validationstatus',
  'value',
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
      <slot><input class="emd-field"/></slot>
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
    const validatorFn = this._validation || this.defaultValidation;

    return (this.hasAttribute('required'))
      ? withRequired(validatorFn)
      : validatorFn;
  }

  set validation(value) {
    this._validation = value;
  }

  attributeChangedCallback(attrName, previousValue, nextValue) {
    if (PROPS.includes(attrName) && previousValue !== nextValue) {
      this.inputElement.setAttribute(attrName, nextValue);
    }
  }

  connectedCallback() {
    this.inputElement.addEventListener('input', this.handleInput);
  }

  disconnectedCallback() {
    this.inputElement.removeEventListener('input', this.handleInput);
  }

  handleInput(evt) {
    this.setAttribute('value', evt.target.value);
  }
};
