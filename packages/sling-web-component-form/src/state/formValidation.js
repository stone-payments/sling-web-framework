import { isPromise } from 'sling-helpers';
import { startValidation, finishValidation } from './byIdReducer.js';
import { FORM } from './constant.js';

export const treatError = error =>
  (error && error.constructor === Error ? error.message : error);

export const atLevel = wrapperFn => (validatorFn, value) => {
  if (validatorFn == null) return wrapperFn();
  const error = validatorFn(value);

  return (isPromise(error))
    ? error.catch(treatError).then(wrapperFn)
    : wrapperFn(error);
};

export const atFieldLevel = (...args) =>
  atLevel(errStr => errStr || null)(...args);

export const atFormLevel = (...args) =>
  atLevel(errObj => errObj || {})(...args);

export const validate = (...args) => (dispatch, getState) => {
  const [
    fieldId,
    validatorThunk,
    start = startValidation,
    finish = finishValidation,
  ] = args;

  const getField = (id) => {
    const state = getState();
    return (state.byId != null) ? state.byId[id] : state[id];
  };

  const field = getField(fieldId);
  const fieldExists = field != null;

  if (fieldExists) {
    const { validation: previousValidation } = field;

    if (previousValidation && previousValidation.cancel) {
      previousValidation.cancel();
    }

    const nextValidation = validatorThunk();

    if (isPromise(nextValidation)) {
      dispatch(start(fieldId, nextValidation));

      nextValidation
        .then((error) => {
          const fieldStillExists = getField(fieldId) != null;

          if (fieldStillExists) {
            dispatch(finish(fieldId, error));
          }
        });
    } else {
      dispatch(finish(fieldId, nextValidation));
    }
  }
};

export const validateField = (fieldId, validatorFn, valueStr) =>
  validate(fieldId, () => atFieldLevel(validatorFn, valueStr));

export const validateFields = (validatorFn, valueObj) =>
  validate(FORM, () => atFormLevel(validatorFn, valueObj));
