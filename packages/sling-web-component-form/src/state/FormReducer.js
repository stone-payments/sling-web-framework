import { setIn, omit } from 'sling-helpers/src';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const FORM_LEVEL = Symbol('FORM_LEVEL');

const INITIAL_FIELD_STATE = {
  error: null,
  isValidating: false,
  validation: null,
  value: '',
  touched: false,
};

const INITIAL_STATE = {
  [FORM_LEVEL]: {
    error: null,
    isValidating: false,
    validation: null,
  },
};

const ADD_FIELD = Symbol('ADD_FIELD');
const REMOVE_FIELD = Symbol('REMOVE_FIELD');
const UPDATE_FIELD_ERROR = Symbol('UPDATE_FIELD_ERROR');
const UPDATE_FIELD_IS_VALIDATING = Symbol('UPDATE_FIELD_IS_VALIDATING');
const UPDATE_FIELD_VALIDATION = Symbol('UPDATE_FIELD_VALIDATION');
const UPDATE_FIELD_VALUE = Symbol('UPDATE_FIELD_VALUE');
const UPDATE_FIELD_TOUCHED = Symbol('UPDATE_FIELD_TOUCHED');

const START_VALIDATION = Symbol('START_VALIDATION');
const FINISH_VALIDATION = Symbol('FINISH_VALIDATION');

export const addField = fieldId => ({
  type: ADD_FIELD,
  fieldId,
});

export const removeField = fieldId => ({
  type: REMOVE_FIELD,
  fieldId,
});

export const updateFieldError = (fieldId, error) => ({
  type: UPDATE_FIELD_ERROR,
  fieldId,
  error,
});

export const updateFieldIsValidating = (fieldId, isValidating) => ({
  type: UPDATE_FIELD_IS_VALIDATING,
  fieldId,
  isValidating,
});

export const updateFieldValidation = (fieldId, validation) => ({
  type: UPDATE_FIELD_VALIDATION,
  fieldId,
  validation,
});

export const updateFieldValue = (fieldId, value) => ({
  type: UPDATE_FIELD_VALUE,
  fieldId,
  value,
});

export const updateFieldTouched = (fieldId, touched) => ({
  type: UPDATE_FIELD_TOUCHED,
  fieldId,
  touched,
});

export const startValidation = (fieldId, validation) => ({
  type: START_VALIDATION,
  fieldId,
  validation,
});

export const finishValidation = (fieldId, error) => ({
  type: FINISH_VALIDATION,
  fieldId,
  error,
});

export const FormReducer = (state = INITIAL_STATE, action = {}) => {
  const updateHelper = (fieldId, value) => ({
    ...state,
    [fieldId]: value,
  });

  switch (action.type) {
    case ADD_FIELD:
      return updateHelper(action.fieldId, { ...INITIAL_FIELD_STATE });

    case REMOVE_FIELD:
      return omit(state, action.fieldId);

    case UPDATE_FIELD_ERROR:
      return updateHelper(action.fieldId,
        setIn(state[action.fieldId], 'error', action.error));

    case UPDATE_FIELD_IS_VALIDATING:
      return updateHelper(action.fieldId,
        setIn(state[action.fieldId], 'isValidating', action.isValidating));

    case UPDATE_FIELD_VALIDATION:
      return updateHelper(action.fieldId,
        setIn(state[action.fieldId], 'validation', action.validation));

    case UPDATE_FIELD_VALUE:
      return updateHelper(action.fieldId,
        setIn(state[action.fieldId], 'value', action.value));

    case UPDATE_FIELD_TOUCHED:
      return updateHelper(action.fieldId,
        setIn(state[action.fieldId], 'touched', action.touched));

    default:
      return state;
  }
};

const makeCancelable = (promise) => {
  const CANCELED = Symbol('CANCELED');

  const canceler = {
    sleep(fn) { this.fn = fn; },
    cancel() { if (this.fn) { this.fn(); } },
  };

  return {
    then(callback) {
      Promise
        .race([
          new Promise(resolve => canceler.sleep(() => resolve(CANCELED))),
          new Promise(resolve => resolve(promise)),
        ])
        .then((maybePromise) => {
          if (maybePromise !== CANCELED) {
            callback(maybePromise);
          }
        });
    },
    cancel() {
      canceler.cancel();
    },
  };
};

const fakeValidator = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve('An error occourred'), 2000);
  });

export const validate = (fieldId, validation) => (dispatch, getState) => {
  const { validation: previousValidation } = getState()[fieldId];

  if (previousValidation) {
    previousValidation.cancel();
  }

  const nextValidation = makeCancelable(validation());

  dispatch(updateFieldIsValidating(fieldId, true));
  dispatch(updateFieldValidation(fieldId, nextValidation));

  nextValidation.then((error) => {
    dispatch(updateFieldError(fieldId, error));
    dispatch(updateFieldValidation(fieldId, null));
    dispatch(updateFieldIsValidating(fieldId, false));
  });
};

const store = createStore(FormReducer, applyMiddleware(thunk));

store.subscribe(() => {
  store.getState(); // ?
});

store.dispatch(addField('last.but[0]'));
store.dispatch(validate('last.but[0]', fakeValidator));

setTimeout(() => {
  store.dispatch(validate('last.but[0]', fakeValidator));
}, 500);
