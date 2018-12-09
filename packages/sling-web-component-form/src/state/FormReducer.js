import { setIn, isDeeplyEmpty, omit, isPromise, toFlatEntries } from 'sling-helpers/src';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import CancelablePromise from 'cancelable-promise';

export const FORM = '__FORM__';

const INITIAL_FIELD_STATE = {
  error: null,
  isValidating: false,
  validation: null,
  value: '',
  touched: false,
};

const INITIAL_BY_ID_STATE = {
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

const startValidation = (fieldId, validation) => ({
  type: START_VALIDATION,
  fieldId,
  validation,
});

const finishValidation = (fieldId, error) => ({
  type: FINISH_VALIDATION,
  fieldId,
  error,
});

export const byIdReducer = (state = INITIAL_BY_ID_STATE, action = {}) => {
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


// VALIDATION

const makeCancelable = promise =>
  new CancelablePromise(resolve => resolve(promise));

const treatError = error =>
  (error && error.constructor === Error ? error.message : error);

const atLevel = wrapperFn => async (validatorFn, value) => {
  if (validatorFn == null) return wrapperFn(undefined);
  const error = validatorFn(value);

  return (isPromise(error))
    ? error.catch(treatError).then(wrapperFn)
    : Promise.resolve(wrapperFn(treatError(error)));
};

const atFieldLevel = (...args) => atLevel(errStr => errStr || null)(...args);

const atFormLevel = (...args) => atLevel(errObj => errObj || {})(...args);

const validate = (fieldId, validatorThunk) => (dispatch, getState) => {
  const field = getState().byId[fieldId];
  const fieldExists = field != null;

  if (fieldExists) {
    const { validation: previousValidation } = field;

    if (previousValidation) {
      previousValidation.cancel();
    }

    const nextValidation = makeCancelable(validatorThunk());
    dispatch(startValidation(fieldId, nextValidation));

    nextValidation.then((error) => {
      const fieldStillExists = getState().byId[fieldId] != null;

      if (fieldStillExists) {
        dispatch(finishValidation(fieldId, error));
      }
    });
  }
};

export const validateField = (fieldId, validatorFn, str) =>
  validate(fieldId, () => atFieldLevel(validatorFn, str));

export const validateForm = (validatorFn, obj) =>
  validate(FORM, () => atFormLevel(validatorFn, obj));


// SELECTORS

const onlyForm = state => state[FORM];

const onlyFields = state => Object
  .entries(state)
  .filter(([key]) => key !== FORM)
  .reduce(toFlatEntries, {});

export const getIsValid = state => isDeeplyEmpty(onlyForm(state).error) &&
  Object.values(onlyFields(state)).every(value => value.error == null);

export const getIsValidating = state =>
  Object.values(state).some(value => value.isValidating === true);

export const getParsedState = (state) => {
  const form = onlyForm(state);
  const fieldEntries = Object.entries(onlyFields(state));

  const errors = {
    ...form.error,
    ...fieldEntries.reduce((result, [fieldId, obj]) =>
      setIn(result, `${fieldId}`, obj.error), {}),
  };

  const values = fieldEntries.reduce((result, [fieldId, obj]) =>
    setIn(result, fieldId, obj.value), {});

  const touched = fieldEntries.reduce((result, [fieldId, obj]) =>
    setIn(result, fieldId, obj.touched), {});

  const isValidatingField = fieldEntries.reduce((result, [fieldId, obj]) =>
    setIn(result, fieldId, obj.isValidating), {});

  const isValid = getIsValid(state);

  const isValidating = getIsValidating(state);

  return { errors, values, touched, isValid, isValidating, isValidatingField };
};


// FORM REDUCER

const INITIAL_STATE = {
  byId: byIdReducer(),
  parsed: getParsedState(byIdReducer()),
};

const formReducer = (state = INITIAL_STATE, action = {}) => {
  const byId = byIdReducer(state.byId, action);
  const parsed = getParsedState(byId);
  return { byId, parsed };
};


// TESTS

const requiredField = value => (!value
  ? 'This field is required'
  : undefined);

const store = createStore(formReducer, applyMiddleware(thunk));

store.subscribe(() => {
  console.log(store.getState().byId);
  console.log(store.getState().parsed);
});

store.dispatch(addField('username'));
store.dispatch(validateField('username', requiredField, ''));

store.dispatch(addField('friend[0]'));
store.dispatch(validateField('friend[0]', requiredField, ''));

store.dispatch(updateFieldValue('username', '100'));
store.dispatch(updateFieldValue('username', '100'));
store.dispatch(updateFieldValue('username', '100'));
store.dispatch(validateField('username', requiredField, '100'));

isDeeplyEmpty({}); // ?
isDeeplyEmpty([]); // ?
isDeeplyEmpty(null); // ?
isDeeplyEmpty(undefined); // ?
isDeeplyEmpty({ a: { b: null }, c: [null, undefined] }); // ?
