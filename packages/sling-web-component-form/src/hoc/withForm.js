import { withEventDispatch } from 'sling-framework';
import { getIn, omit } from 'sling-helpers';
import { withReducer } from './withReducer.js';
import * as reducer from '../state/formReducer.js';

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

export const withForm = (
  Base = class {},
  MutObserver = MutationObserver,
  fromReducer = reducer,
) =>
  class extends withEventDispatch(withReducer(fromReducer.formReducer)(Base)) {
    constructor() {
      super();

      this.handleStateUpdate = this.handleStateUpdate.bind(this);
      this.handleDomUpdate = this.handleDomUpdate.bind(this);
      this.handleValueUpdate = this.handleValueUpdate.bind(this);
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
      this.shadowRoot.addEventListener('input', this.handleValueUpdate);
      this.shadowRoot.addEventListener('update', this.handleValueUpdate);
      this.shadowRoot.addEventListener('click', this.handleClick);

      this.handleDomUpdate();
    }

    disconnectedCallback() {
      if (super.disconnectedCallback) {
        super.disconnectedCallback();
      }

      this._mo.disconnect();

      this.shadowRoot.removeEventListener('blur', this.handleBlur, true);
      this.shadowRoot.removeEventListener('input', this.handleValueUpdate);
      this.shadowRoot.removeEventListener('update', this.handleValueUpdate);
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
      this.handleStateUpdate();
    }

    getFieldById(fieldId) {
      return this.fields.find(field =>
        this.constructor.getFieldId(field) === fieldId);
    }

    addField(fieldId) {
      this.dispatchAction(fromReducer.addField(fieldId));
    }

    removeFields(fieldPrefix) {
      this.dispatchAction(fromReducer.removeFields(fieldPrefix));
    }

    setValues(values) {
      this.dispatchAction(fromReducer.setValues(values));
    }

    validateFieldByElement(field) {
      this.dispatchAction(fromReducer.validateField(
        this.constructor.getFieldId(field),
        field.validation,
        field.value,
      ));
    }

    validateField(fieldId) {
      this.validateFieldByElement(this.getFieldById(fieldId));
    }

    validateFields() {
      this.dispatchAction(fromReducer.validateFields(
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
        this.dispatchAction(fromReducer.updateFieldTouched(fieldId, true));
      });
    }

    submitForm() {
      if (!this.formState.isSubmitting) {
        this.touchAllFields();
        this.validateForm();
        this.dispatchAction(fromReducer.startSubmission());
      }
    }

    finishSubmission() {
      if (this.formState.isSubmitting) {
        this.dispatchAction(fromReducer.finishSubmission());
        this.preventNextSubmissionEvent = false;
      }
    }

    resetForm() {
      this.dispatchAction(fromReducer.resetForm());
    }

    handleStateUpdate() {
      const { formState } = this;

      this.fields.forEach((field) => {
        const fieldId = this.constructor.getFieldId(field);
        field.value = getIn(formState.values, fieldId);

        const touched = getIn(formState.touched, fieldId);

        if (touched) {
          field.validating = getIn(formState.isValidatingField, fieldId);

          if (!field.validating) {
            field.validationstatus = getIn(formState.isValidField, fieldId)
              ? 'success'
              : 'error';
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
        const touched = getIn(formState.touched, fieldId);
        const isValidatingField = getIn(formState.isValidatingField, fieldId);
        const error = getIn(this.formState.errors, fieldId);

        if (!relatedField || (touched && !isValidatingField)) {
          fieldMessage.message = error || undefined;
        } else {
          fieldMessage.message = undefined;
        }
      });

      const { isValid, isValidating, isSubmitting, values, errors } = formState;

      const shouldDispatchSubmitEvent = this.form
        && isSubmitting
        && !isValidating
        && !this.preventNextSubmissionEvent;

      if (shouldDispatchSubmitEvent) {
        this.preventNextSubmissionEvent = true;

        if (isValid) {
          this.dispatchEventAndMethod('submitsuccess', values, this.form);
        } else {
          this.dispatchEventAndMethod('submiterror', errors, this.form);
        }
      }
    }

    handleDomUpdate() {
      this.handleStateUpdate();
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

        this.dispatchAction(fromReducer.updateFieldTouched(fieldId, true));
        this.validateFieldByElement(field);
        this.validateFields();
      }
    }

    handleValueUpdate({ target: field }) {
      if (this.constructor.isFormField(field)) {
        const fieldId = this.constructor.getFieldId(field);
        let { value } = field;
        value = (value == null) ? '' : value;
        const pastValue = getIn(this.formState.values, fieldId) || '';

        if (pastValue !== value) {
          this.dispatchAction(fromReducer.updateFieldValue(fieldId, value));
          this.validateFieldByElement(field);
          this.validateFields();
        }
      }
    }
  };
