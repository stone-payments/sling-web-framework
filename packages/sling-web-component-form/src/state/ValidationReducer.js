import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { setIn, mergeDeep, isDeeplyEmpty } from '../helpers/immutableHelper.js';

const isFunction = arg => typeof arg === 'function';
const isPromise = arg => arg && arg.then && isFunction(arg.then);

const INITIAL_STATE = {
  fieldLevelErrors: {},
  errors: {},
  isValid: false,
  isValidating: false,
  validationCount: 0,
};

export const INCREMENT_VALIDATION_COUNT = 'INCREMENT_VALIDATION_COUNT';
export const DECREMENT_VALIDATION_COUNT = 'DECREMENT_VALIDATION_COUNT';
export const UPDATE_VALIDATION = 'UPDATE_VALIDATION';

const incrementValidationCount = () => ({
  type: INCREMENT_VALIDATION_COUNT,
});

const decrementValidationCount = () => ({
  type: DECREMENT_VALIDATION_COUNT,
});

const updateValidation = args => ({
  type: UPDATE_VALIDATION,
  ...args,
});

const treatAsyncError = untreatedError => (untreatedError.constructor === Error
  ? untreatedError.message
  : untreatedError);

const validateAtFieldLevel = ({ validator, value, path }) => {
  if (validator == null) return undefined;

  const maybeError = validator(value);

  if (isPromise(maybeError)) {
    return maybeError
      .catch(treatAsyncError)
      .then(error => setIn({}, path, error || null));
  }

  return setIn({}, path, maybeError || null);
};

const validateAtFormLevel = ({ validator, values }) => {
  if (validator == null) return {};

  const maybeError = validator(values);

  if (isPromise(maybeError)) {
    return maybeError
      .catch(treatAsyncError)
      .then(error => error || {});
  }

  return maybeError || {};
};

export const validateFormAndFields = (...args) =>
  async (dispatch, getState) => {
    const [
      formValidationRequest = {},
      fieldValidationRequests = [{}],
    ] = args;

    dispatch(incrementValidationCount());

    const formLevelErrors = await validateAtFormLevel(formValidationRequest);

    let fieldLevelErrors = await Promise
      .all(fieldValidationRequests.map(validateAtFieldLevel));

    fieldLevelErrors = mergeDeep(getState().fieldLevelErrors,
      ...fieldLevelErrors);

    const errors = mergeDeep(formLevelErrors, fieldLevelErrors);

    dispatch(decrementValidationCount());

    const isValid = !getState().isValidating && isDeeplyEmpty(errors);

    dispatch(updateValidation({ fieldLevelErrors, errors, isValid }));
  };

const updateIsValidating = state => setIn(state, 'isValidating',
  state.validationCount > 0);

export const ValidationReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case INCREMENT_VALIDATION_COUNT:
      return updateIsValidating(
        setIn(state, 'validationCount', state.validationCount + 1),
      );

    case DECREMENT_VALIDATION_COUNT:
      return updateIsValidating(
        setIn(state, 'validationCount', state.validationCount - 1),
      );

    case UPDATE_VALIDATION:
      return {
        ...state,
        fieldLevelErrors: action.fieldLevelErrors,
        errors: action.errors,
        isValid: action.isValid,
      };

    default:
      return state;
  }
};

// TESTS

const syncField = value => (value === 'admin'
  ? 'Não use admin field sync'
  : undefined);

const asyncField = value => (value === 'admin'
  ? Promise.reject(new Error('Não use admin field async'))
  : undefined);

const syncForm = values => (values.laser === 'admin'
  ? { laser: 'Não use admin field sync' }
  : undefined);

const store = createStore(ValidationReducer, applyMiddleware(thunk));

store.getState(); // ?

store.dispatch(validateFormAndFields(
  { validator: syncForm, values: { laser: 'admin' } },
  { validator: syncField, value: 'admin', path: 'name' },
  { validator: asyncField, value: 'admin', path: 'email' },
));

store.getState(); // ?

setTimeout(() => {
  store.getState(); // ?
}, 200);
