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

export const setDirty = dirty => ({
  type: SET_DIRTY,
  dirty,
});

export const FormReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_DIRTY:
      return setIn(state, 'dirty', action.dirty);

    default:
      return state;
  }
};
