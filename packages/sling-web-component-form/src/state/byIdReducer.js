import { omit, getIn } from 'sling-helpers';
import { FORM } from './constant.js';

const INITIAL_FIELD_STATE = {
  error: null,
  isValidating: false,
  validatedAtLeastOnce: false,
  validation: null,
  value: '',
  touched: false,
};

const INITIAL_STATE = {
  [FORM]: {
    error: null,
    isValidating: false,
    validatedAtLeastOnce: false,
    validation: null,
  },
};

const ADD_FIELD = Symbol('ADD_FIELD');
const REMOVE_FIELD = Symbol('REMOVE_FIELD');
const UPDATE_FIELD_VALUE = Symbol('UPDATE_FIELD_VALUE');
const UPDATE_FIELD_TOUCHED = Symbol('UPDATE_FIELD_TOUCHED');
const UPDATE_VALUES = Symbol('UPDATE_VALUES');
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

export const updateValues = values => ({
  type: UPDATE_VALUES,
  values,
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

const updatePropWithCondition = (state, action) => (obj, condition = true) => {
  const { fieldId } = action;
  const field = state[fieldId];

  return (condition)
    ? { ...state, [fieldId]: { ...field, ...obj } }
    : state;
};

export const byIdReducer = (state = INITIAL_STATE, action = {}) => {
  const updateField = updatePropWithCondition(state, action);

  switch (action.type) {
    case ADD_FIELD:
      return (state[action.fieldId] == null)
        ? { ...state, [action.fieldId]: { ...INITIAL_FIELD_STATE } }
        : state;

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

    case UPDATE_VALUES:
      return Object
        .entries(state)
        .reduce((result, [fieldId, obj]) => ({
          ...result,
          [fieldId]: (fieldId === FORM)
            ? obj
            : { ...obj, value: getIn(action.values, fieldId) || '' },
        }), {});

    case START_VALIDATION:
      return updateField({
        isValidating: true,
        validation: action.validation,
      });

    case FINISH_VALIDATION:
      return updateField({
        isValidating: false,
        validatedAtLeastOnce: true,
        validation: null,
        error: action.error,
      });

    default:
      return state;
  }
};
