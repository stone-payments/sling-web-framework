import { isPromise } from 'sling-helpers';
import { startValidation, finishValidation } from './byIdReducer.js';
import { FORM } from './constant.js';

export const treatError = error =>
  (error && error.constructor === Error ? error.message : error);

export const atLevel = wrapperFn => (validatorFn, value) => {
  if (validatorFn == null) return wrapperFn(undefined);
  const error = validatorFn(value);

  return (isPromise(error))
    ? error.catch(treatError).then(wrapperFn)
    : wrapperFn(treatError(error));
};

export const atFieldLevel = (...args) =>
  atLevel(errStr => errStr || null)(...args);

export const atFormLevel = (...args) =>
  atLevel(errObj => errObj || {})(...args);

export const validate = (fieldId, validatorThunk) => (dispatch, getState) => {
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
      dispatch(startValidation(fieldId, nextValidation));

      nextValidation
        .then((error) => {
          const fieldStillExists = getField(fieldId) != null;

          if (fieldStillExists) {
            dispatch(finishValidation(fieldId, error));
          }
        });
    } else {
      dispatch(finishValidation(fieldId, nextValidation));
    }
  }
};

export const validateField = (fieldId, validatorFn, valueStr) =>
  validate(fieldId, () => atFieldLevel(validatorFn, valueStr));

export const validateFields = (validatorFn, valueObj) =>
  validate(FORM, () => atFormLevel(validatorFn, valueObj));
