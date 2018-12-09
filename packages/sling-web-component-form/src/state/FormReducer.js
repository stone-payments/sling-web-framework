import { setIn, isDeeplyEmpty, omit, isPromise, toFlatEntries } from 'sling-helpers/src';
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
  const updateProp = (obj, condition = true) => {
    const { fieldId } = action;
    const field = state[fieldId];

    return (condition)
      ? { ...state, [fieldId]: { ...field, ...obj } }
      : state;
  };

  switch (action.type) {
    case ADD_FIELD:
      return (state[action.fieldId] == null)
        ? { ...state, [action.fieldId]: { ...INITIAL_FIELD_STATE } }
        : state;

    case REMOVE_FIELD:
      return omit(state, action.fieldId);

    case UPDATE_FIELD_VALUE:
      return updateProp(
        { value: action.value },
        state[action.fieldId] != null &&
          state[action.fieldId].value !== action.value,
      );

    case UPDATE_FIELD_TOUCHED:
      return updateProp(
        { touched: action.touched },
        state[action.fieldId] != null &&
          state[action.fieldId].touched !== action.touched,
      );

    case START_VALIDATION:
      return updateProp({
        isValidating: true,
        validation: action.validation,
      });

    case FINISH_VALIDATION:
      return updateProp({
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
  const getField = (id) => {
    const state = getState();
    return (state.byId != null) ? state.byId[id] : state[id];
  };

  const field = getField(fieldId);
  const fieldExists = field != null;

  if (fieldExists) {
    const { validation: previousValidation } = field;

    if (previousValidation) {
      previousValidation.cancel();
    }

    const nextValidation = makeCancelable(validatorThunk());
    dispatch(startValidation(fieldId, nextValidation));

    nextValidation.then((error) => {
      const fieldStillExists = getField(fieldId) != null;

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

const getIsValid = state => isDeeplyEmpty(onlyForm(state).error) &&
  Object.values(onlyFields(state)).every(value => value.error == null);

const getIsValidating = state =>
  Object.values(state).some(value => value.isValidating === true);

const getParsedState = (state) => {
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
  dirty: false,
  submitCount: 0,
  isSubmitting: false,
  byId: byIdReducer(),
  ...getParsedState(byIdReducer()),
};

const UPDATE_VALUES = Symbol('UPDATE_VALUES');
const UPDATE_DIRTY = Symbol('UPDATE_DIRTY');
const START_SUBMISSION = Symbol('START_SUBMISSION');
const FINISH_SUBMISSION = Symbol('FINISH_SUBMISSION');

export const updateValues = values => ({
  type: UPDATE_VALUES,
  values,
});

export const updateDirty = dirty => ({
  type: UPDATE_DIRTY,
  dirty,
});

export const startSubmission = () => ({
  type: START_SUBMISSION,
});

export const finishSubmission = () => ({
  type: FINISH_SUBMISSION,
});

export const formReducer = (state = INITIAL_STATE, action = {}) => {
  const previousById = state.byId;
  const byId = byIdReducer(previousById, action);
  const parsed = getParsedState(byId);
  const nextState = { ...state, byId, ...parsed };
  const { submitCount } = nextState;

  switch (action.type) {
    case UPDATE_VALUES:
      return { ...nextState, values: action.values };

    case UPDATE_DIRTY:
      return (state.dirty !== action.dirty)
        ? { ...nextState, dirty: action.dirty }
        : state;

    case START_SUBMISSION:
      return (!state.isSubmitting)
        ? { ...nextState, submitCount: submitCount + 1, isSubmitting: true }
        : state;

    case FINISH_SUBMISSION:
      return (state.isSubmitting)
        ? { ...nextState, isSubmitting: false }
        : state;

    default:
      return (previousById !== byId) ? nextState : state;
  }
};
