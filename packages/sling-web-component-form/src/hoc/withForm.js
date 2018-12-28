import { withEventDispatch } from 'sling-framework';
import { getIn, omit } from 'sling-helpers';
import { withReducer } from './withReducer.js';

import {
  formReducer,
  validateField,
  validateFields,
  updateFieldValue,
  updateFieldTouched,
  setValues,
  startSubmission,
  finishSubmission,
  resetForm,
  addField,
  removeFields,
} from '../state/formReducer.js';

export const FORM_TYPES = [
  'SLING-FORM',
];

export const FORM_FIELD_TYPES = [
  'SLING-FIELD',
  'SLING-INPUT',
  'SLING-SELECT',
];

export const FORM_FIELD_MESSAGE_TYPES = [
  'SLING-FIELD-MESSAGE',
];

export const FORM_SUBMIT_TYPES = [
  'SLING-BUTTON',
  'BUTTON',
];

export const withForm = (Base = class {}, MutObserver = MutationObserver) =>
  class extends withEventDispatch(withReducer(formReducer)(Base)) {
    constructor() {
      super();

      this.handleStateUpdate = this.handleStateUpdate.bind(this);
      this.handleDomUpdate = this.handleDomUpdate.bind(this);
      this.handleInput = this.handleInput.bind(this);
      this.handleBlur = this.handleBlur.bind(this);
      this.handleClick = this.handleClick.bind(this);

      this._mo = new MutObserver(this.handleDomUpdate);
    }

    connectedCallback() {
      if (super.connectedCallback) {
        super.connectedCallback();
      }

      this._mo.observe(this.shadowRoot, { childList: true, subtree: true });

      this.shadowRoot.addEventListener('blur', this.handleBlur, true);
      this.shadowRoot.addEventListener('input', this.handleInput);
      this.shadowRoot.addEventListener('update', this.handleInput);
      this.shadowRoot.addEventListener('click', this.handleClick);

      this.handleDomUpdate();
    }

    disconnectedCallback() {
      if (super.disconnectedCallback) {
        super.disconnectedCallback();
      }

      this._mo.disconnect();

      this.shadowRoot.removeEventListener('blur', this.handleBlur, true);
      this.shadowRoot.removeEventListener('input', this.handleInput);
      this.shadowRoot.removeEventListener('update', this.handleInput);
      this.shadowRoot.removeEventListener('click', this.handleClick);
    }

    static isForm(target) {
      return FORM_TYPES.includes(target.nodeName);
    }

    static isFormField(target) {
      return FORM_FIELD_TYPES.includes(target.nodeName);
    }

    static isFormFieldMessage(target) {
      return FORM_FIELD_MESSAGE_TYPES.includes(target.nodeName);
    }

    static isSubmitButton(target) {
      return FORM_SUBMIT_TYPES.includes(target.nodeName)
        && target.type === 'submit';
    }

    static isResetButton(target) {
      return FORM_SUBMIT_TYPES.includes(target.nodeName)
        && target.type === 'reset';
    }

    static getFieldId(field) {
      return field.name || field.id;
    }

    get form() {
      return this.shadowRoot
        ? Array
          .from(this.shadowRoot.querySelectorAll('*'))
          .find(this.constructor.isForm)
        : undefined;
    }

    get fields() {
      return this.form
        ? Array
          .from(this.form.querySelectorAll('*'))
          .filter(this.constructor.isFormField)
        : [];
    }

    get fieldMessages() {
      return this.form
        ? Array
          .from(this.form.querySelectorAll('*'))
          .filter(this.constructor.isFormFieldMessage)
        : [];
    }

    get submitButton() {
      return this.form
        ? Array
          .from(this.form.querySelectorAll('*'))
          .find(this.constructor.isSubmitButton)
        : undefined;
    }

    get resetButton() {
      return this.form
        ? Array
          .from(this.form.querySelectorAll('*'))
          .find(this.constructor.isResetButton)
        : undefined;
    }

    get state() {
      return this._state;
    }

    set state(value) {
      this._state = value;
      this.formState = omit(this._state, 'byId');
      this.handleStateUpdate(this.formState);
    }

    addField(fieldId) {
      this.dispatchAction(addField(fieldId));
    }

    removeFields(fieldPrefix) {
      this.dispatchAction(removeFields(fieldPrefix));
    }

    setValues(values) {
      this.dispatchAction(setValues(values));
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

    validateFields() {
      this.dispatchAction(validateFields(
        this.form.validation,
        this.formState.values,
      ));
    }

    validateForm() {
      this.fields.forEach((field) => {
        this.validateFieldByElement(field);
      });

      this.validateFields();
    }

    touchAllFields() {
      this.fields.forEach((field) => {
        const fieldId = this.constructor.getFieldId(field);
        this.dispatchAction(updateFieldTouched(fieldId, true));
      });
    }

    submitForm() {
      if (!this.formState.isSubmitting) {
        this.touchAllFields();
        this.validateForm();
        this.dispatchAction(startSubmission());
      }
    }

    finishSubmission() {
      if (this.formState.isSubmitting) {
        this.dispatchAction(finishSubmission());
        this.preventNextSubmission = false;
      }
    }

    resetForm() {
      this.dispatchAction(resetForm());
    }

    handleStateUpdate(nextState) {
      this.fields.forEach((field) => {
        const fieldId = this.constructor.getFieldId(field);
        const touched = getIn(nextState.touched, fieldId);
        field.value = getIn(nextState.values, fieldId);

        if (touched) {
          field.validating = getIn(nextState.isValidatingField, fieldId);

          if (!field.validating) {
            field.validationstatus = getIn(nextState.errors, fieldId) != null
              ? 'error'
              : 'success';
          } else {
            field.validationstatus = undefined;
          }
        } else {
          field.validationstatus = undefined;
        }
      });

      this.fieldMessages.forEach((fieldMessage) => {
        const fieldId = this.constructor.getFieldId(fieldMessage);
        const relatedField = this.getFieldById(fieldId);
        const touched = getIn(nextState.touched, fieldId);
        const isValidatingField = getIn(nextState.isValidatingField, fieldId);
        const error = getIn(this.formState.errors, fieldId);

        if (!relatedField || (touched && !isValidatingField)) {
          fieldMessage.message = error || null;
        } else {
          fieldMessage.message = null;
        }
      });

      const {
        isValid,
        isValidating,
        isSubmitting,
        values,
        errors,
      } = this.formState;

      if (isSubmitting && !isValidating && !this.preventNextSubmission) {
        this.preventNextSubmission = true;

        if (this.form) {
          if (isValid) {
            this.dispatchEventAndMethod('submitsuccess', values, this.form);
          } else {
            this.dispatchEventAndMethod('submiterror', errors, this.form);
          }
        }
      }
    }

    handleDomUpdate() {
      this.handleStateUpdate(this.formState);
    }

    handleClick({ target: field }) {
      if (this.constructor.isSubmitButton(field)) {
        this.submitForm();
      }

      if (this.constructor.isResetButton(field)) {
        this.resetForm();
      }
    }

    handleBlur({ target: field }) {
      if (this.constructor.isFormField(field)) {
        const fieldId = this.constructor.getFieldId(field);

        this.dispatchAction(updateFieldTouched(fieldId, true));
        this.validateFieldByElement(field);
        this.validateFields();
      }
    }

    handleInput({ target: field }) {
      if (this.constructor.isFormField(field)) {
        const fieldId = this.constructor.getFieldId(field);
        const { value } = field || '';
        const pastValue = getIn(this.formState.values, fieldId) || '';

        if (pastValue !== value) {
          this.dispatchAction(updateFieldValue(fieldId, value));
          this.validateFieldByElement(field);
          this.validateFields();
        }
      }
    }
  };
