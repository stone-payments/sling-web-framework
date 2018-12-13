import CancelablePromise from 'cancelable-promise';
import { isPromise } from 'sling-helpers/src';
import { startValidation, finishValidation } from './byIdReducer.js';
import { FORM } from './constant.js';

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

const validate = (fieldId, validatorThunk, delay) => (dispatch, getState) => {
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

    const nextValidation = new CancelablePromise(resolve =>
      setTimeout(resolve, delay));

    dispatch(startValidation(fieldId, nextValidation));

    nextValidation
      .then(validatorThunk)
      .then((error) => {
        const fieldStillExists = getField(fieldId) != null;

        if (fieldStillExists) {
          dispatch(finishValidation(fieldId, error));
        }
      });
  }
};

export const validateField = (fieldId, validatorFn, valueStr, delay) =>
  validate(fieldId, () => atFieldLevel(validatorFn, valueStr), delay);

export const validateForm = (validatorFn, valueObj, delay) =>
  validate(FORM, () => atFormLevel(validatorFn, valueObj), delay);
