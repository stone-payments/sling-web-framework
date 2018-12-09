import { omit } from 'sling-helpers/src';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import CancelablePromise from 'cancelable-promise';

const FORM = Symbol('FORM');

const INITIAL_FIELD_STATE = {
  error: null,
  isValidating: false,
  validation: null,
  value: '',
  touched: false,
};

const INITIAL_STATE = {
  [FORM]: {
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
  const updateField = (obj, condition = true) => {
    const { fieldId } = action;
    const field = state[fieldId];

    return (condition)
      ? { ...state, [fieldId]: { ...field, ...obj } }
      : state;
  };

  switch (action.type) {
    case ADD_FIELD:
      return {
        ...state,
        [action.fieldId]: { ...INITIAL_FIELD_STATE },
      };

    case REMOVE_FIELD:
      return omit(state, action.fieldId);

    case UPDATE_FIELD_VALUE:
      return updateField(
        { value: action.value },
        state[action.fieldId] != null &&
          state[action.fieldId].value !== action.value,
      );

    case UPDATE_FIELD_TOUCHED:
      return updateField(
        { touched: action.touched },
        state[action.fieldId] != null &&
          state[action.fieldId].touched !== action.touched,
      );

    case START_VALIDATION:
      return updateField({
        isValidating: true,
        validation: action.validation,
      });

    case FINISH_VALIDATION:
      return updateField({
        isValidating: false,
        validation: null,
        error: action.error,
      });

    default:
      return state;
  }
};

const makeCancelable = promise =>
  new CancelablePromise(resolve => resolve(promise));

export const validate = (fieldId, validation) => (dispatch, getState) => {
  const field = getState()[fieldId];

  if (field != null) {
    const { validation: previousValidation } = field;

    if (previousValidation) {
      previousValidation.cancel();
    }

    const nextValidation = makeCancelable(validation);
    dispatch(startValidation(fieldId, nextValidation));

    nextValidation.then((error) => {
      dispatch(finishValidation(fieldId, error));
    });
  }
};

// TESTS

const fakeValidator = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve('An error occourred'), 2000);
  });

const anotherFakeValidator = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve('Other error occourred'), 1000);
  });

const store = createStore(FormReducer, applyMiddleware(thunk));

let previousState = INITIAL_STATE;

store.subscribe(() => {
  const currentState = store.getState();
  console.log(previousState !== currentState);

  if (previousState !== currentState) {
    console.log(currentState);
  }

  previousState = currentState;
});

store.dispatch(addField('last.but[0]'));
store.dispatch(addField('last.but[1]'));

store.dispatch(updateFieldValue('last.but[0]', 100));
store.dispatch(updateFieldValue('last.but[0]', 100));
store.dispatch(updateFieldValue('last.but[0]', 100));

store.dispatch(validate('last.but[0]', fakeValidator()));
store.dispatch(validate('last.but[0]', anotherFakeValidator()));
store.dispatch(validate('last.but[1]', fakeValidator()));
store.dispatch(validate(FORM, fakeValidator()));
