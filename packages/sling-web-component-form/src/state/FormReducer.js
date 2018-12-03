import { setIn } from '../helpers/immutableHelper.js';

const INITIAL_STATE = {
  dirty: false,
  errors: {},
  isSubmitting: false,
  isValid: false,
  isValidating: false,
  submitCount: 0,
  touched: {},
  values: {},
};

export const SET_DIRTY = 'SET_DIRTY';
export const SET_FIELD_VALUE = 'SET_FIELD_VALUE';
export const TOUCH_FIELD = 'TOUCH_FIELD';

export const setDirty = dirty => ({
  type: SET_DIRTY,
  dirty,
});

export const setFieldValue = (fieldId, value) => ({
  type: SET_FIELD_VALUE,
  fieldId,
  value,
});

export const touchField = fieldId => ({
  type: TOUCH_FIELD,
  fieldId,
});

export const FormReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_DIRTY:
      return setIn(state, 'dirty', action.dirty);

    case SET_FIELD_VALUE:
      return setIn(state, `values.${action.fieldId}`,
        (typeof action.value === 'undefined') ? null : action.value);

    case TOUCH_FIELD:
      return setIn(state, `touched.${action.fieldId}`, true);

    default:
      return state;
  }
};
