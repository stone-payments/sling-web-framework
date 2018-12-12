import CancelablePromise from 'cancelable-promise';
import { isPromise } from 'sling-helpers';
import { startValidation, finishValidation } from './byIdReducer.js';
import { FORM } from './constant.js';

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
