import { omit } from 'sling-helpers/src';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import CancelablePromise from 'cancelable-promise';

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
  switch (action.type) {
    case ADD_FIELD:
      return {
        ...state,
        [action.fieldId]: { ...INITIAL_FIELD_STATE },
      };

    case REMOVE_FIELD:
      return omit(state, action.fieldId);

    case UPDATE_FIELD_VALUE:
      return {
        ...state,
        [action.fieldId]: {
          ...state[action.fieldId],
          value: action.value,
        },
      };

    case UPDATE_FIELD_TOUCHED:
      return {
        ...state,
        [action.fieldId]: {
          ...state[action.fieldId],
          touched: action.touched,
        },
      };

    case START_VALIDATION:
      return {
        ...state,
        [action.fieldId]: {
          ...state[action.fieldId],
          isValidating: true,
          validation: action.validation,
        },
      };

    case FINISH_VALIDATION:
      return {
        ...state,
        [action.fieldId]: {
          ...state[action.fieldId],
          isValidating: false,
          validation: null,
          error: action.error,
        },
      };

    default:
      return state;
  }
};

const makeCancelable = promise =>
  new CancelablePromise(resolve => resolve(promise));

const fakeValidator = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve('An error occourred'), 2000);
  });

export const validate = (fieldId, validation) => (dispatch, getState) => {
  const { validation: previousValidation } = getState()[fieldId];

  if (previousValidation) {
    previousValidation.cancel();
  }

  const nextValidation = makeCancelable(validation);
  dispatch(startValidation(fieldId, nextValidation));

  nextValidation.then((error) => {
    dispatch(finishValidation(fieldId, error));
  });
};

const store = createStore(FormReducer, applyMiddleware(thunk));

store.subscribe(() => {
  store.getState(); // ?
});

store.dispatch(addField('last.but[0]'));
store.dispatch(validate('last.but[0]', fakeValidator()));
store.dispatch(validate('last.but[0]', fakeValidator()));
