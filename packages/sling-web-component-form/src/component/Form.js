import { withEventDispatch } from 'sling-framework';
import { isFunction, setAttr, setIn, mergeDeep } from 'sling-helpers';

import {
  validateField,
  validateForm,
  onValidationStart,
  onValidationComplete,
} from '../state/FormActions.js';

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

    this.state = {
      dirty: false,
      errors: {},
      isValid: false,
      isValidating: false,
      isSubmitting: false,
      submitCount: 0,
      values: {},
      touched: {},
    };

    onValidationStart(({ isValidating }) => {
      if (this.state.isValidating !== isValidating) {
        this.updateState('isValidating', isValidating);
      }
    });

    onValidationComplete((result) => {
      this.state = { ...this.state, ...result };

      if (this.state.isSubmitting && !this.state.isValidating) {
        if (this.state.isValid) {
          this.dispatchEventAndMethod('formsubmitsuccess', this.state.values);
        } else {
          this.dispatchEventAndMethod('formsubmiterror', this.state.errors);
        }
      }
    });
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

  updateState(path, value) {
    const resolvedPath = isFunction(path) ? path() : path;
    this.state = setIn(this.state, resolvedPath, value);
  }

  async initForm() {
    const fieldValues = this.fields.reduce((result, field) => {
      const fieldId = this.constructor.getFieldId(field);
      return setIn(result, fieldId, field.value || '');
    }, {});

    const userValues = this.initialvalues;

    await Promise.resolve(); // this avoids a LitElement warning

    this.updateState('values', mergeDeep(fieldValues, userValues));
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
      this.dispatchEventAndMethod('formupdate', this.state);
    }
  }

  get values() {
    return this.state.values;
  }

  set values(values) {
    this.updateState('values', values);
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
    validateField(
      field.validation,
      field.value,
      this.constructor.getFieldId(field),
    );
  }

  validateField(fieldId) {
    this.validateFieldByElement(this.getFieldById(fieldId));
  }

  validateForm() {
    validateForm(this.validation, this.state.values);
  }

  touchField(field) {
    const fieldId = this.constructor.getFieldId(field);
    this.updateState(`touched.${fieldId}`, true);
  }

  submitForm() {
    if (!this.state.isSubmitting) {
      this.updateState('isSubmitting', true);
      this.updateState('submitCount', this.state.submitCount + 1);

      this.fields.forEach((field) => {
        this.touchField(field);
        this.validateFieldByElement(field);
      });

      this.validateForm();
    }
  }

  finishSubmission() {
    if (this.state.isSubmitting) {
      this.updateState('isSubmitting', false);
    }
  }

  handleClick({ target: field }) {
    if (field.type === 'submit') {
      this.submitForm();
    }
  }

  handleBlur({ target: field }) {
    if (this.constructor.isFormField(field)) {
      this.updateState('dirty', true);
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
      this.updateState(`values.${fieldId}`, field.value);

      if (!this.skipvalidationonchange) {
        this.validateFieldByElement(field);
        this.validateForm();
      }
    }
  }
}
