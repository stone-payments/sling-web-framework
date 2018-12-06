import { withEventDispatch } from 'sling-framework';
import { isFunction, isPromise, setIn } from 'sling-helpers/src';

import {
  FormReducer,
  setDirty,
  setFieldTouched,
  setFieldValue,
  validateFieldLevel,
  validateFormLevel,
} from '../state/FormReducer.js';

export class Form extends withEventDispatch(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
        @import url('sling-web-component-form/src/index.css');
      </style>
      <slot></slot>
    `;

    this.handleInput = this.handleInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.neueState = FormReducer();
  }

  dispatchAction(action) {
    let resolvedAction = action;
    const getState = () => this.neueState;

    if (isFunction(resolvedAction)) {
      resolvedAction = action(this.dispatchAction.bind(this), getState);
    }

    if (isPromise(resolvedAction)) {
      resolvedAction.then((asyncAction) => {
        this.neueState = FormReducer(getState(), asyncAction);
      });
    }

    this.neueState = FormReducer(getState(), resolvedAction);
  }

  get neueState() {
    return this._neueState;
  }

  set neueState(value) {
    if (this._neueState !== value) {
      console.log(value);
      this._neueState = value;
      this.dispatchFormUpdate();
    }
  }

  connectedCallback() {
    if (isFunction(super.connectedCallback)) {
      super.connectedCallback();
    }

    this.addEventListener('click', this.handleClick);
    this.addEventListener('input', this.handleInput);
    this.addEventListener('blur', this.handleBlur, true);

    this.initForm();
  }

  disconnectedCallback() {
    if (isFunction(super.disconnectedCallback)) {
      super.disconnectedCallback();
    }

    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('input', this.handleInput);
    this.removeEventListener('blur', this.handleBlur, true);
  }

  initForm() {
    this.fields.forEach((field) => {
      const fieldId = this.constructor.getFieldId(field);
      this.dispatchAction(setFieldValue(fieldId, field.value));
    }, {});
  }

  static isFormField(target) {
    return ['SLING-INPUT', 'SLING-SELECT', 'INPUT', 'SELECT', 'TEXTAREA']
      .includes(target.nodeName);
  }

  static getFieldId(field) {
    return field.getAttribute('name') ||
      field.name ||
      field.getAttribute('id') ||
      field.id;
  }

  static async getFieldError(field) {
    const validationFn = field.validation;

    if (isFunction(validationFn)) {
      let error;
      const fieldId = this.getFieldId(field);

      try {
        error = await Promise.resolve(validationFn(field.value));
      } catch (err) {
        error = (err.constructor === Error) ? err.message : err;
      }

      return setIn({}, fieldId, error || null);
    }

    return {};
  }

  get fields() {
    return Array
      .from(this.querySelectorAll('*'))
      .filter(this.constructor.isFormField);
  }

  get values() {
    return this.neueState.values;
  }

  set values(values) {
    this.neueState = setIn(this.neueState, 'values', values);
  }

  get skipvalidationonchange() {
    return this.hasAttribute('skipvalidationonchange');
  }

  set skipvalidationonchange(value) {
    if (value != null && value !== false) {
      this.setAttribute('skipvalidationonchange', '');
    } else {
      this.removeAttribute('skipvalidationonchange');
    }
  }

  get skipvalidationonblur() {
    return this.hasAttribute('skipvalidationonblur');
  }

  set skipvalidationonblur(value) {
    if (value != null && value !== false) {
      this.setAttribute('skipvalidationonblur', '');
    } else {
      this.removeAttribute('skipvalidationonblur');
    }
  }

  dispatchFormUpdate() {
    this.dispatchEventAndMethod('formupdate', this.neueState);
  }

  dispatchFormSubmission() {
    this.dispatchEventAndMethod('formsubmit');
  }

  neueValidateFormAndField(field) {
    this.dispatchAction(validateFieldLevel({
      path: this.constructor.getFieldId(field),
      value: field.value,
      validator: field.validation,
    }));

    this.dispatchAction(validateFormLevel({
      values: this.neueState.values,
      validator: this.validation,
    }));
  }

  neueValidateFormAndAllFields() {
    this.fields.forEach((field) => {
      this.dispatchAction(validateFieldLevel({
        path: this.constructor.getFieldId(field),
        value: field.value,
        validator: field.validation,
      }));
    });

    this.dispatchAction(validateFormLevel({
      values: this.neueState.values,
      validator: this.validation,
    }));
  }

  handleClick({ target }) {
    if (target.type === 'submit') {
      this.dispatchFormSubmission();
    }
  }

  handleBlur({ target }) {
    if (this.constructor.isFormField(target)) {
      const fieldId = this.constructor.getFieldId(target);
      this.dispatchAction(setDirty(true));
      this.dispatchAction(setFieldTouched(fieldId, true));

      if (!this.skipvalidationonblur) {
        this.neueValidateFormAndField(target);
      }
    }
  }

  handleInput({ target }) {
    if (this.constructor.isFormField(target)) {
      const fieldId = this.constructor.getFieldId(target);
      this.dispatchAction(setFieldValue(fieldId, target.value));

      if (!this.skipvalidationonchange) {
        this.neueValidateFormAndField(target);
      }
    }
  }
}
