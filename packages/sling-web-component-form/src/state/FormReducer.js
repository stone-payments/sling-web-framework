import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { setIn, mergeDeep, isDeeplyEmpty } from '../helpers/immutableHelper.js';

const isFunction = arg => typeof arg === 'function';
const isPromise = arg => arg && arg.then && isFunction(arg.then);
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const INITIAL_STATE = {
  dirty: false,
  fieldLevelErrors: {},
  formLevelErrors: {},
  errors: {},
  isSubmitting: false,
  isValid: false,
  isValidating: false,
  validationCount: 0,
  submitCount: 0,
  touched: {},
  values: {},
};

export const SET_DIRTY = 'SET_DIRTY';
export const INCREMENT_VALIDATION_COUNT = 'INCREMENT_VALIDATION_COUNT';
export const DECREMENT_VALIDATION_COUNT = 'DECREMENT_VALIDATION_COUNT';
export const START_SUBMISSION = 'START_SUBMISSION';
export const FINISH_SUBMISSION = 'FINISH_SUBMISSION';
export const SET_FIELD_LEVEL_ERROR = 'SET_FIELD_LEVEL_ERROR';
export const SET_FORM_LEVEL_ERRORS = 'SET_FORM_LEVEL_ERRORS';
export const SET_FIELD_VALUE = 'SET_FIELD_VALUE';
export const SET_FIELD_TOUCHED = 'SET_FIELD_TOUCHED';

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

export const startSubmission = () => ({
  type: START_SUBMISSION,
});

export const finishSubmission = () => ({
  type: FINISH_SUBMISSION,
});

export const setFieldLevelError = (path, error) => ({
  type: SET_FIELD_LEVEL_ERROR,
  path,
  error,
});

export const setFormLevelErrors = errors => ({
  type: SET_FORM_LEVEL_ERRORS,
  errors,
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

export const applyValidation = (validator, input, path) => (dispatch) => {
  const maybeError = validator(input);

  if (isPromise(maybeError)) {
    dispatch(incrementValidationCount());

    maybeError
      .catch(untreatedError => (untreatedError.constructor === Error
        ? untreatedError.message
        : untreatedError))
      .then((error) => {
        dispatch(path
          ? setFieldLevelError(path, error)
          : setFormLevelErrors(error));

        dispatch(decrementValidationCount());
      });
  } else {
    dispatch(path
      ? setFieldLevelError(path, maybeError)
      : setFormLevelErrors(maybeError));
  }
};

export const validateFieldLevel = (path, validator, value) =>
  applyValidation(validator, value, path);

export const validateFormLevel = (validator, values) =>
  applyValidation(validator, values);

export const combineErrors = state => setIn(state, 'errors',
  mergeDeep(state.formLevelErrors, state.fieldLevelErrors));

export const updateIsValidating = state => setIn(state, 'isValidating',
  state.validationCount > 0);

export const updateIsValid = state => setIn(state, 'isValid',
  !state.isValidating && isDeeplyEmpty(state.errors));

export const incrementSubmitCount = state => setIn(state, 'submitCount',
  state.submitCount + 1);

export const FormReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_DIRTY:
      return setIn(state, 'dirty', !!action.dirty);

    case INCREMENT_VALIDATION_COUNT:
      return updateIsValid(updateIsValidating(
        setIn(state, 'validationCount', state.validationCount + 1),
      ));

    case DECREMENT_VALIDATION_COUNT:
      return updateIsValid(updateIsValidating(
        setIn(state, 'validationCount', state.validationCount - 1),
      ));

    case START_SUBMISSION:
      return !state.isSubmitting
        ? incrementSubmitCount(setIn(state, 'isSubmitting', true))
        : state;

    case FINISH_SUBMISSION:
      return state.isSubmitting
        ? setIn(state, 'isSubmitting', false)
        : state;

    case SET_FIELD_LEVEL_ERROR:
      return combineErrors(
        setIn(state, `fieldLevelErrors.${action.path}`, action.error || null),
      );

    case SET_FORM_LEVEL_ERRORS:
      return combineErrors(
        setIn(state, 'formLevelErrors', action.errors || {}),
      );

    case SET_FIELD_VALUE:
      return setIn(state, `values.${action.path}`, action.value);

    case SET_FIELD_TOUCHED:
      return setIn(state, `touched.${action.path}`, !!action.touched);

    default:
      return state;
  }
};

// TESTS

const syncFieldValidator = value => (value === 'admin'
  ? 'Não use admin'
  : undefined);

const syncFormValidator = (values) => {
  const errors = {};

  if (values.phone == null && values.cell == null) {
    errors.minPhone = 'Preencha ao menos um telefone';
  }

  return errors;
};

const asyncFieldValidator = value => sleep(300).then(() => {
  if (value === 'admin') {
    throw new Error('Não use admin');
  }
});

const asyncFormValidator = values => sleep(300).then(() => {
  const errors = {};

  if (values.phone == null && values.cell == null) {
    errors.minPhone = 'Preencha ao menos um telefone';
  }

  if (Object.values(errors).length > 0) {
    throw errors;
  }
});

const store = createStore(
  FormReducer,
  applyMiddleware(thunk),
);

let changes = 0;

store.subscribe(() => {
  changes += 1;
});

store.dispatch(validateFieldLevel('name', asyncFieldValidator, 'admin'));
store.dispatch(validateFieldLevel('email', asyncFieldValidator, 'laser'));
store.dispatch(validateFieldLevel('website', asyncFieldValidator, 'laser'));

changes; // ?

store.getState(); // ?

sleep(500).then(() => {
  store.getState(); // ?
  changes; // ?
});
