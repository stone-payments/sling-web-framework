import { withEventDispatch } from 'sling-framework';
import { isFunction, setAttr, setIn, mergeDeep, isPromise } from 'sling-helpers';

import {
  formReducer,
  addField,
  updateDirty,
  updateFieldTouched,
  updateFieldValue,
} from '../state/FormReducer.js';

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

    this.REDUCER = formReducer;
    this.STATE = this.REDUCER();

    onValidationStart(({ isValidating }) => {
      if (this.state.isValidating !== isValidating) {
        this.updateState('isValidating', isValidating);
      }
    });

    onValidationComplete((result) => {
      this.state = { ...this.state, ...result };

      if (this.state.isSubmitting && !this.state.isValidating) {
        if (this.state.isValid) {
          this.dispatchEventAndMethod('submitsuccess', this.state.values);
        } else {
          this.dispatchEventAndMethod('submiterror', this.state.errors);
        }
      }
    });
  }

  dispatchAction(action) {
    let resolvedAction = action;
    const getState = () => this.state;

    if (isFunction(resolvedAction)) {
      resolvedAction = action(this.dispatchAction.bind(this), getState);
    }

    if (isPromise(resolvedAction)) {
      return resolvedAction.then((asyncAction) => {
        this.STATE = this.REDUCER(this.STATE, asyncAction);
        return this.STATE;
      });
    }

    this.STATE = this.REDUCER(this.STATE, resolvedAction);
    return this.STATE;
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
    this.fields.forEach((field) => {
      const fieldId = this.constructor.getFieldId(field);
      this.dispatchAction(addField(fieldId));
    });

    console.log(this.STATE);

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
      this.dispatchEventAndMethod('update', this.state);
    }
  }

  get values() {
    return this.state.values;
  }

  set values(values) {
    this.updateState('values', values);
  }

  get errors() {
    return this.state.errors;
  }

  set errors(values) {
    this.updateState('errors', values);
  }

  get touched() {
    return this.state.touched;
  }

  set touched(values) {
    this.updateState('touched', values);
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
      const fieldId = this.constructor.getFieldId(field);
      this.dispatchAction(updateDirty(true));
      this.dispatchAction(updateFieldTouched(fieldId, true));

      this.updateState('dirty', true);
      this.touchField(field);

      if (!this.skipvalidationonblur) {
        this.validateFieldByElement(field);
        this.validateForm();
      }
    }
  }

  handleInput({ target: field }) {
    console.log([this.constructor.getFieldId(field), field.value]);

    if (this.constructor.isFormField(field)) {
      const fieldId = this.constructor.getFieldId(field);
      this.dispatchAction(updateFieldValue(fieldId, field.value));

      this.updateState(`values.${fieldId}`, field.value);

      if (!this.skipvalidationonchange) {
        this.validateFieldByElement(field);
        this.validateForm();
      }
    }
  }
}
