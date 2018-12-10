import { withEventDispatch } from 'sling-framework';
import { isFunction, setAttr, getIn, setIn, isPromise, omit } from 'sling-helpers';

import {
  formReducer,
  addField,
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

    const fn = this.childrenUpdated.bind(this);
    this._mo = new MutationObserver(fn);
    this._mo.observe(this, { childList: true });
    fn();

    this.addEventListener('click', this.handleClick);
    this.addEventListener('input', this.handleInput);
    this.addEventListener('blur', this.handleBlur, true);
  }

  disconnectedCallback() {
    if (isFunction(super.disconnectedCallback)) {
      super.disconnectedCallback();
    }

    this._mo.disconnect();

    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('input', this.handleInput);
    this.removeEventListener('blur', this.handleBlur, true);
  }

  async childrenUpdated() {
    this.updateFields();
    await Promise.resolve(); // avoids a LitElement warning;
    this.dispatchUpdateEvent();
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
    return this._state;
  }

  set state(nextState) {
    if (this._state !== nextState) {
      this._state = nextState;
      this.dispatchUpdateEvent();

      const { isValidating, isValid, isSubmitting, values, errors } = nextState;

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

  set values(nextValues) {
    this.state = setIn(this.state, 'values', nextValues);
    this.updateFields(nextValues);
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

  get isValidatingField() {
    return this.state.isValidatingField;
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

  dispatchUpdateEvent() {
    this.dispatchEventAndMethod('update', omit(this.state, 'byId'));
  }

  updateFields(values) {
    this.fields.forEach((field) => {
      const fieldId = this.constructor.getFieldId(field);
      this.dispatchAction(addField(fieldId));

      if (values != null) {
        const previousValue = field.value;
        const nextValue = getIn(values, fieldId);

        if (nextValue == null) {
          field.value = '';
        } else if (previousValue !== nextValue) {
          field.value = nextValue;
        }
      }
    });
  }

  getFieldById(fieldId) {
    return this.fields.find(field =>
      this.constructor.getFieldId(field) === fieldId);
  }

  validateField(fieldId) {
    this.validateFieldByElement(this.getFieldById(fieldId));
  }

  validateForm() {
    this.dispatchAction(validateForm(this.validation, this.state.values));
  }

  validateFieldByElement(field) {
    this.dispatchAction(validateField(
      this.constructor.getFieldId(field),
      field.validation,
      field.value,
    ));
  }

  touchFieldByElement(field) {
    const fieldId = this.constructor.getFieldId(field);
    this.dispatchAction(updateFieldTouched(fieldId, true));
  }

  updateFieldValueByElement(field) {
    const fieldId = this.constructor.getFieldId(field);
    this.dispatchAction(updateFieldValue(fieldId, field.value));
  }

  submitForm() {
    if (!this.state.isSubmitting) {
      this.fields.forEach((field) => {
        this.touchFieldByElement(field);
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
      this.touchFieldByElement(field);

      if (!this.skipvalidationonblur) {
        this.validateFieldByElement(field);
        this.validateForm();
      }
    }
  }

  handleInput({ target: field }) {
    if (this.constructor.isFormField(field)) {
      this.updateFieldValueByElement(field);

      if (!this.skipvalidationonchange) {
        this.validateFieldByElement(field);
        this.validateForm();
      }
    }
  }
}
