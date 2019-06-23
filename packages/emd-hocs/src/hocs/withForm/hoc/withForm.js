import { getIn, omit, isFunction, isPromise } from '@stone-payments/emd-helpers';
import { withEventDispatch } from '../../withEventDispatch.js';
import * as redux from '../state/formReducer.js';

export const formSelector = [
  'emd-form',
  'form'
].join(', ');

export const fieldSelector = [
  'emd-field',
  'emd-select',
  'input',
  'select'
].join(', ');

export const fieldMessageSelector = [
  'emd-field-message',
  'emd-field-wrapper'
].join(', ');

export const buttonSelector = [
  'emd-button',
  'button'
].join(', ');

const DEFAULT_CONFIG = {
  formSelector,
  fieldSelector,
  fieldMessageSelector,
  buttonSelector
};

const searchElements = (domEl, selector) => {
  if (domEl.matches(selector)) {
    return [domEl];
  }

  return [
    ...domEl.querySelectorAll(selector),
    ...domEl.shadowRoot
      ? domEl.shadowRoot.querySelectorAll(selector)
      : []
  ];
};

export const withForm = (Base = class {}) =>
  class extends withEventDispatch(Base) {
    constructor (element, userConfig) {
      super();

      this.element = element || this;
      this.redux = redux;
      this.reducer = this.redux.formReducer;
      this.state = this.reducer();
      this.userConfig = userConfig;

      this._handleStateChange = this._handleStateChange.bind(this);
      this._handleDomUpdate = this._handleDomUpdate.bind(this);
      this._handleValueUpdate = this._handleValueUpdate.bind(this);
      this._handleBlur = this._handleBlur.bind(this);
      this._handleClick = this._handleClick.bind(this);

      this._startListeners = this._startListeners.bind(this);

      this._connectStandardElement();
    }

    connectedCallback () {
      if (super.connectedCallback) {
        super.connectedCallback();
      }
      this._startListeners();
    }

    disconnectedCallback () {
      if (super.disconnectedCallback) {
        super.disconnectedCallback();
      }
      this._removeListeners();
    }

    static _checkDocReady () {
      return ['interactive', 'complete'].includes(document.readyState);
    }

    _connectStandardElement () {
      if (!this.tagName || !this.tagName.includes('-')) {
        if (this.constructor._checkDocReady()) {
          this._startListeners();
        } else {
          document.addEventListener('readystatechange', () => {
            if (this.constructor._checkDocReady()) {
              this._startListeners();
            }
          });
        }
      }
    }

    _startListeners () {
      this._mo = new MutationObserver(this._handleDomUpdate);
      this._mo.observe(this.form, { childList: true, subtree: true });

      this.form.addEventListener('blur', this._handleBlur, true);
      this.form.addEventListener('input', this._handleValueUpdate);
      this.form.addEventListener('update', this._handleValueUpdate);
      this.form.addEventListener('click', this._handleClick);

      this._handleDomUpdate();
    }

    _removeListeners () {
      this._mo.disconnect();

      this.form.removeEventListener('blur', this._handleBlur, true);
      this.form.removeEventListener('input', this._handleValueUpdate);
      this.form.removeEventListener('update', this._handleValueUpdate);
      this.form.removeEventListener('click', this._handleClick);
    }

    _dispatchAction (action) {
      let resolvedAction = action;
      const getState = () => this.state;

      if (isFunction(resolvedAction)) {
        resolvedAction = action(this._dispatchAction.bind(this), getState);
      }

      if (isPromise(resolvedAction)) {
        resolvedAction.then((asyncAction) => {
          this.state = this.reducer(this.state, asyncAction);
        });
      }

      this.state = this.reducer(this.state, resolvedAction);
    }

    _searchElements (...args) {
      return searchElements(this.element, ...args);
    }

    isForm (target) {
      return target.matches(this.config.formSelector);
    }

    isFormField (target) {
      return target.matches(this.config.fieldSelector);
    }

    isFormFieldMessage (target) {
      return target.matches(this.config.fieldMessageSelector);
    }

    isSubmitButton (target) {
      return target.matches(this.config.buttonSelector) &&
        target.type === 'submit';
    }

    isResetButton (target) {
      return target.matches(this.config.buttonSelector) &&
        target.type === 'reset';
    }

    static getFieldId (field) {
      return field.getAttribute('name') ||
        field.name ||
        field.getAttribute('id') ||
        field.id;
    }

    get config () {
      return { ...DEFAULT_CONFIG, ...this.userConfig };
    }

    set config (value) {
      this.userConfig = value;
    }

    get form () {
      return this.config
        ? this._searchElements(this.config.formSelector)
          .find(item => item != null)
        : undefined;
    }

    get fields () {
      return this.config
        ? this._searchElements(this.config.fieldSelector)
        : [];
    }

    get fieldMessages () {
      return this.config
        ? this._searchElements(this.config.fieldMessageSelector)
        : [];
    }

    get submitButton () {
      return this.config
        ? this._searchElements(this.config.buttonSelector)
          .find(item => item != null && item.type === 'submit')
        : undefined;
    }

    get resetButton () {
      return this.config
        ? this._searchElements(this.config.buttonSelector)
          .find(item => item != null && item.type === 'reset')
        : undefined;
    }

    get state () {
      return this._state;
    }

    set state (value) {
      if (this._state !== value) {
        this._state = value;
        this.formState = omit(this._state, 'byId');
        this._handleStateChange();
        this._dispatchAsyncStateChangeEvent();
      }
    }

    _dispatchAsyncStateChangeEvent () {
      this._stateUpdateEventQueue = this._stateUpdateEventQueue || [];
      this._stateUpdateEventQueue.push(this.formState);

      Promise.resolve().then(() => {
        if (this._stateUpdateEventQueue.length === 1 && this.form) {
          this.dispatchEventAndMethod('formstatechange',
            this.formState, this.form);
        }
        this._stateUpdateEventQueue.pop();
      });
    }

    getFieldById (fieldId) {
      return this.fields.find(field =>
        this.constructor.getFieldId(field) === fieldId);
    }

    addField (fieldId) {
      this._stateChangedProgrammatically = true;
      this._dispatchAction(this.redux.addField(fieldId));
      this._stateChangedProgrammatically = false;
    }

    removeFields (fieldPrefix) {
      this._stateChangedProgrammatically = true;
      this._dispatchAction(this.redux.removeFields(fieldPrefix));
      this._stateChangedProgrammatically = false;
    }

    setValues (values) {
      this._stateChangedProgrammatically = true;
      this._dispatchAction(this.redux.setValues(values));
      this._stateChangedProgrammatically = false;
    }

    _validateFieldByElement (field) {
      const fieldId = this.constructor.getFieldId(field);
      const value = getIn(this.formState.values, fieldId) || '';

      this._dispatchAction(this.redux.validateField(
        fieldId,
        field.validation,
        value
      ));
    }

    validateField (fieldId) {
      this._validateFieldByElement(this.getFieldById(fieldId));
    }

    validateFields () {
      this._dispatchAction(this.redux.validateFields(
        this.form.validation,
        this.formState.values
      ));
    }

    validateForm () {
      this.fields.forEach((field) => {
        this._validateFieldByElement(field);
      });

      this.validateFields();
    }

    touchAllFields () {
      this.fields.forEach((field) => {
        const fieldId = this.constructor.getFieldId(field);
        this._dispatchAction(this.redux.updateFieldTouched(fieldId, true));
      });
    }

    submitForm () {
      if (!this.formState.isSubmitting) {
        this.touchAllFields();
        this.validateForm();
        this._dispatchAction(this.redux.startSubmission());
      }
    }

    finishSubmission () {
      if (this.formState.isSubmitting) {
        this._dispatchAction(this.redux.finishSubmission());
        this.preventNextSubmissionEvent = false;
      }
    }

    resetForm () {
      this._stateChangedProgrammatically = true;
      this._dispatchAction(this.redux.resetForm());
      this._stateChangedProgrammatically = false;
    }

    _handleStateChange () {
      const { formState } = this;

      this.fields.forEach((field) => {
        const fieldId = this.constructor.getFieldId(field);

        if (this._stateChangedProgrammatically) {
          const pastValue = field.value;
          const nextValue = getIn(formState.values, fieldId) || '';

          if (pastValue !== nextValue) {
            field.value = nextValue;
          }
        }

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
          fieldMessage.setAttribute('message', error || '');
        } else {
          fieldMessage.setAttribute('message', '');
        }
      });

      const shouldDispatchSubmitEvent = this.form &&
        formState.isSubmitting &&
        !formState.isValidating &&
        !this.preventNextSubmissionEvent;

      if (shouldDispatchSubmitEvent) {
        this.preventNextSubmissionEvent = true;

        if (formState.isValid) {
          this.dispatchEventAndMethod('submitsuccess',
            formState.values, this.form);
        } else {
          this.dispatchEventAndMethod('submiterror',
            formState.errors, this.form);
        }
      }
    }

    _handleDomUpdate () {
      if (!this.wasRenderedBefore) {
        const initialValues = this.fields.reduce((result, field) => ({
          ...result,
          [this.constructor.getFieldId(field)]: field.value || ''
        }), {});

        this.setValues(initialValues);
      }

      this.wasRenderedBefore = true;
      this._handleStateChange();
    }

    _handleClick ({ target: field }) {
      if (this.isSubmitButton(field)) {
        this.submitForm();
      }

      if (this.isResetButton(field)) {
        this.resetForm();
      }
    }

    _handleBlur ({ target: field }) {
      if (this.isFormField(field)) {
        const fieldId = this.constructor.getFieldId(field);

        this._dispatchAction(this.redux.updateFieldTouched(fieldId, true));
        this._validateFieldByElement(field);
        this.validateFields();
      }
    }

    _handleValueUpdate ({ target: field, detail }) {
      if (this.isFormField(field)) {
        const fieldId = this.constructor.getFieldId(field);

        let value = detail || field.value;
        value = (value == null) ? '' : value;

        const pastValue = getIn(this.formState.values, fieldId) || '';

        if (pastValue !== value) {
          this._dispatchAction(this.redux.updateFieldValue(fieldId, value));
          this._validateFieldByElement(field);
          this.validateFields();
        }
      }
    }
  };
