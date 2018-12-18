import { getIn } from 'sling-helpers';
import { withReducer } from './withReducer.js';

import {
  formReducer,
  validateField,
  validateForm,
  updateFieldValue,
  updateFieldTouched,
  updateFieldUsed,
  setValues,
  startSubmission,
  finishSubmission,
} from '../state/formReducer.js';

const FORM_TYPES = [
  'SLING-FORM',
];

const FORM_FIELD_TYPES = [
  'SLING-FIELD',
  'SLING-INPUT',
  'SLING-SELECT',
];

const FORM_SUBMIT_TYPES = [
  'SLING-BUTTON',
  'BUTTON',
];

export const withForm = Base => class extends withReducer(formReducer)(Base) {
  constructor() {
    super();
    this.handleStateUpdate = this.handleStateUpdate.bind(this);
    this.handleDomUpdate = this.handleDomUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._mo = new MutationObserver(this.handleDomUpdate);
    this._mo.observe(this.shadowRoot, { childList: true, subtree: true });
    this.handleDomUpdate();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._mo.disconnect();
  }

  static isForm(target) {
    return FORM_TYPES.includes(target.nodeName);
  }

  static isFormField(target) {
    return FORM_FIELD_TYPES.includes(target.nodeName);
  }

  static isSubmitButton(target) {
    return FORM_SUBMIT_TYPES.includes(target.nodeName)
      && target.type === 'submit';
  }

  static getFieldId(field) {
    return field.getAttribute('name') ||
      field.name ||
      field.getAttribute('id') ||
      field.id;
  }

  get form() {
    return this.shadowRoot
      ? Array
        .from(this.shadowRoot.querySelectorAll('*'))
        .find(this.constructor.isForm)
      : null;
  }

  get fields() {
    return this.form
      ? Array
        .from(this.form.querySelectorAll('*'))
        .filter(this.constructor.isFormField)
      : [];
  }

  get submitButton() {
    return this.form
      ? Array
        .from(this.form.querySelectorAll('*'))
        .find(this.constructor.isSubmitButton)
      : null;
  }

  get state() {
    return this._state;
  }

  set state(value) {
    this._state = value;
    this.formState = this._state;
    this.handleStateUpdate(this._state);
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

  validateForm() {
    this.dispatchAction(validateForm(
      this.form.validation,
      this.state.values,
    ));
  }

  submitForm() {
    if (!this.state.isSubmitting) {
      this.fields.forEach((field) => {
        const fieldId = this.constructor.getFieldId(field);
        this.dispatchAction(updateFieldTouched(fieldId, true));
        this.validateFieldByElement(field);
      });

      this.validateForm();
      this.dispatchAction(startSubmission());
    }
  }

  finishSubmission() {
    if (this.state.isSubmitting) {
      this.dispatchAction(finishSubmission());
      this.preventNextSubmission = false;
    }
  }

  handleStateUpdate(nextState) {
    this.fields.forEach((field) => {
      const fieldId = this.constructor.getFieldId(field);
      const wasTouched = getIn(nextState.touched, fieldId);
      field.value = getIn(nextState.values, fieldId);

      if (wasTouched) {
        field.validating = getIn(nextState.isValidatingField, fieldId);

        if (!field.validating) {
          field.validationstatus = getIn(nextState.errors, fieldId) != null
            ? 'error'
            : 'success';
        } else {
          field.validationstatus = undefined;
        }
      }
    });

    const { isValid, isValidating, isSubmitting, values, errors } = this.state;

    if (isSubmitting && !isValidating && !this.preventNextSubmission) {
      this.preventNextSubmission = true;
      if (isValid) {
        this.dispatchEventAndMethod('submitsuccess', values);
      } else {
        this.dispatchEventAndMethod('submiterror', errors);
      }
    }
  }

  handleDomUpdate() {
    this.fields.forEach((field) => {
      field.oninput = this.handleInput;
      field.onblur = this.handleBlur;
    });

    this.submitButton.onclick = this.handleClick;
  }

  handleClick() {
    this.submitForm();
  }

  handleBlur({ target: field }) {
    if (this.constructor.isFormField(field)) {
      const fieldId = this.constructor.getFieldId(field);

      this.dispatchAction(updateFieldTouched(fieldId, true));
      this.validateFieldByElement(field);
      this.validateForm();
    }
  }

  handleInput({ target: field }) {
    if (this.constructor.isFormField(field)) {
      const fieldId = this.constructor.getFieldId(field);
      const { value } = field;

      this.dispatchAction(updateFieldUsed(fieldId, true));
      this.dispatchAction(updateFieldValue(fieldId, value));
      this.validateFieldByElement(field);
      this.validateForm();
    }
  }
};
