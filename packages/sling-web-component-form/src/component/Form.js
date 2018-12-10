import { withEventDispatch } from 'sling-framework';
import { isFunction, setAttr, isPromise, omit } from 'sling-helpers';

import {
  formReducer,
  addField,
  updateDirty,
  updateFieldTouched,
  updateFieldValue,
  startSubmission,
  finishSubmission,
  validateField,
  validateForm,
} from '../state/formReducer.js';

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

    this.reducer = formReducer;
    this.state = this.reducer();
  }

  dispatchAction(action) {
    let resolvedAction = action;
    const getState = () => this.state;

    if (isFunction(resolvedAction)) {
      resolvedAction = action(this.dispatchAction.bind(this), getState);
    }

    if (isPromise(resolvedAction)) {
      resolvedAction.then((asyncAction) => {
        this.state = this.reducer(this.state, asyncAction);
      });
    }

    this.state = this.reducer(this.state, resolvedAction);
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

  async initForm() {
    this.fields.forEach((field) => {
      const fieldId = this.constructor.getFieldId(field);
      this.dispatchAction(addField(fieldId));
    });
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

  get fields() {
    return Array
      .from(this.querySelectorAll('*'))
      .filter(this.constructor.isFormField);
  }

  get state() {
    return this.__state;
  }

  set state(newState) {
    if (this.__state !== newState) {
      this.__state = newState;
      this.dispatchEventAndMethod('update', omit(this.state, 'byId'));

      const { isValidating, isValid, isSubmitting, values, errors } = newState;

      if (isSubmitting && !isValidating) {
        if (isValid) {
          this.dispatchEventAndMethod('submitsuccess', values);
        } else {
          this.dispatchEventAndMethod('submiterror', errors);
        }
      }
    }
  }

  get values() {
    return this.state.values;
  }

  get errors() {
    return this.state.errors;
  }

  get touched() {
    return this.state.touched;
  }

  get dirty() {
    return this.state.dirty;
  }

  get isValid() {
    return this.state.isValid;
  }

  get isValidating() {
    return this.state.isValidating;
  }

  get isSubmitting() {
    return this.state.isSubmitting;
  }

  get submitCount() {
    return this.state.submitCount;
  }

  get skipvalidationonchange() {
    return this.hasAttribute('skipvalidationonchange');
  }

  set skipvalidationonchange(value) {
    setAttr(this, 'skipvalidationonchange', value);
  }

  get skipvalidationonblur() {
    return this.hasAttribute('skipvalidationonblur');
  }

  set skipvalidationonblur(value) {
    setAttr(this, 'skipvalidationonblur', value);
  }

  getFieldById(fieldId) {
    return this.fields.find(field =>
      this.constructor.getFieldId(field) === fieldId);
  }

  validateFieldByElement(field) {
    this.dispatchAction(validateField(
      this.constructor.getFieldId(field),
      field.validation,
      field.value,
    ));
  }

  validateField(fieldId) {
    this.validateFieldByElement(this.getFieldById(fieldId));
  }

  validateForm() {
    this.dispatchAction(validateForm(this.validation, this.state.values));
  }

  touchField(field) {
    const fieldId = this.constructor.getFieldId(field);
    this.dispatchAction(updateFieldTouched(fieldId, true));
  }

  submitForm() {
    if (!this.state.isSubmitting) {
      this.fields.forEach((field) => {
        this.touchField(field);
        this.validateFieldByElement(field);
      });

      this.validateForm();
      this.dispatchAction(startSubmission());
    }
  }

  finishSubmission() {
    if (this.state.isSubmitting) {
      this.dispatchAction(finishSubmission());
    }
  }

  handleClick({ target: field }) {
    if (field.type === 'submit') {
      this.submitForm();
    }
  }

  handleBlur({ target: field }) {
    if (this.constructor.isFormField(field)) {
      this.dispatchAction(updateDirty(true));
      this.touchField(field);

      if (!this.skipvalidationonblur) {
        this.validateFieldByElement(field);
        this.validateForm();
      }
    }
  }

  handleInput({ target: field }) {
    if (this.constructor.isFormField(field)) {
      const fieldId = this.constructor.getFieldId(field);
      this.dispatchAction(updateFieldValue(fieldId, field.value));

      if (!this.skipvalidationonchange) {
        this.validateFieldByElement(field);
        this.validateForm();
      }
    }
  }
}
