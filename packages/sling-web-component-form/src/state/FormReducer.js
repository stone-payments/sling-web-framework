import { setIn, mergeDeep } from '../helpers/immutableHelper.js';

const isFunction = arg => typeof arg === 'function';
const isPromise = arg => arg.then && isFunction(arg.then);

const INITIAL_STATE = {
  dirty: false,
  errors: {},
  isSubmitting: false,
  isValid: false,
  validationCount: 0,
  submitCount: 0,
  touched: {},
  values: {},
};

export const SET_DIRTY = 'SET_DIRTY';
export const INCREMENT_VALIDATION_COUNT = 'INCREMENT_VALIDATION_COUNT';
export const DECREMENT_VALIDATION_COUNT = 'DECREMENT_VALIDATION_COUNT';
export const SET_FIELD_ERROR = 'SET_FIELD_ERROR';
export const SET_FIELD_ERRORS = 'SET_FIELD_ERRORS';
export const SET_FIELD_VALUE = 'SET_FIELD_VALUE';
export const TOUCH_FIELD = 'TOUCH_FIELD';

export const setDirty = dirty => ({
  type: SET_DIRTY,
  dirty,
});

export const incrementValidationCount = () => ({
  type: INCREMENT_VALIDATION_COUNT,
});

export const decrementValidationCount = () => ({
  type: DECREMENT_VALIDATION_COUNT,
});

export const setFieldError = (path, error) => ({
  type: SET_FIELD_ERROR,
  path,
  error,
});

export const setFieldErrors = errors => ({
  type: SET_FIELD_ERRORS,
  errors,
});

export const setFieldValue = (path, value) => ({
  type: SET_FIELD_VALUE,
  path,
  value,
});

export const touchField = path => ({
  type: TOUCH_FIELD,
  path,
});

export const applyValidation = (validator, input) => {
  const maybeError = validator(input);

  if (isPromise(maybeError)) {
    return maybeError
      .catch(untreatedError => (untreatedError.constructor === Error
        ? untreatedError.message
        : untreatedError));
  }

  return maybeError;
};

export const validateSingleField = (path, validator, value) => (dispatch) => {
  const maybeError = applyValidation(validator, value);

  if (isPromise(maybeError)) {
    dispatch(incrementValidationCount());

    maybeError.then((error) => {
      dispatch(setFieldError(path, error));
      dispatch(decrementValidationCount());
    });
  } else {
    dispatch(setFieldError(path, maybeError));
  }
};

export const validateCombinedFields = (validator, values) => (dispatch) => {
  const maybeErrors = applyValidation(validator, values);

  if (isPromise(maybeErrors)) {
    dispatch(incrementValidationCount());

    maybeErrors.then((errors) => {
      dispatch(setFieldErrors(errors));
      dispatch(decrementValidationCount());
    });
  } else {
    dispatch(setFieldErrors(maybeErrors));
  }
};

export const FormReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_DIRTY:
      return setIn(state, 'dirty', !!action.dirty);

    case INCREMENT_VALIDATION_COUNT:
      return setIn(state, 'validationCount', state.validationCount + 1);

    case DECREMENT_VALIDATION_COUNT:
      return setIn(state, 'validationCount', state.validationCount - 1);

    case SET_FIELD_ERROR:
      return setIn(state, `errors.${action.path}`, action.error || null);

    case SET_FIELD_ERRORS:
      return setIn(state, 'errors',
        mergeDeep(state.errors, action.errors || {}));

    case SET_FIELD_VALUE:
      return setIn(state, `values.${action.path}`, action.value);

    case TOUCH_FIELD:
      return setIn(state, `touched.${action.path}`, true);

    default:
      return state;
  }
};

let myState = FormReducer();

myState = FormReducer(myState, setFieldError('name', 'Campo obrigatório'));
myState = FormReducer(myState, setFieldError('phone.home', 'Campo'));
myState = FormReducer(myState, setFieldErrors({ email: 'Doodle' }));
myState = FormReducer(myState, setFieldErrors({ name: null }));
myState = FormReducer(myState, setFieldErrors({ email: 'My libido' }));
myState = FormReducer(myState, setFieldError('email', 'Campo obrigatório'));
myState = FormReducer(myState, setFieldErrors({ phone: { home: 'Need' } }));

myState; // ?