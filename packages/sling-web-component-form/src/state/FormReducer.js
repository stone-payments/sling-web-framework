import { setIn } from 'sling-helpers/src';

export * from './FormActions.js';

const INITIAL_STATE = {
  dirty: false,
  errors: {},
  isValid: false,
  isValidating: false,
  isSubmitting: false,
  submitCount: 0,
  touched: {},
  values: {},
};

const SET_DIRTY = 'SET_DIRTY';
const START_SUBMISSION = 'START_SUBMISSION';
const FINISH_SUBMISSION = 'FINISH_SUBMISSION';
const UPDATE_VALIDATION = 'UPDATE_VALIDATION';
const SET_FIELD_VALUE = 'SET_FIELD_VALUE';
const SET_FIELD_TOUCHED = 'SET_FIELD_TOUCHED';

export const setDirty = dirty => ({
  type: SET_DIRTY,
  dirty,
});

export const startSubmission = () => ({
  type: START_SUBMISSION,
});

export const finishSubmission = () => ({
  type: FINISH_SUBMISSION,
});

export const setFieldValue = (path, value) => ({
  type: SET_FIELD_VALUE,
  path,
  value,
});

export const setFieldTouched = (path, touched) => ({
  type: SET_FIELD_TOUCHED,
  path,
  touched,
});

export const updateValidation = validation => ({
  type: UPDATE_VALIDATION,
  ...validation,
});

const incrementSubmitCount = state => setIn(state, 'submitCount',
  state.submitCount + 1);

export const FormReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case UPDATE_VALIDATION:
      return {
        ...state,
        errors: action.errors,
        isValid: action.isValid,
        isValidating: action.isValidating,
      };

    case SET_DIRTY:
      return setIn(state, 'dirty', !!action.dirty);

    case START_SUBMISSION:
      return incrementSubmitCount(setIn(state, 'isSubmitting', true));

    case FINISH_SUBMISSION:
      return setIn(state, 'isSubmitting', false);

    case SET_FIELD_VALUE:
      return setIn(state, `values.${action.path}`, action.value);

    case SET_FIELD_TOUCHED:
      return setIn(state, `touched.${action.path}`, !!action.touched);

    default:
      return state;
  }
};
