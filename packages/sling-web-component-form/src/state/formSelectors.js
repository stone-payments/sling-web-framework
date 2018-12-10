import { setIn, toFlatEntries, isDeeplyEmpty } from 'sling-helpers';
import { FORM } from './constant.js';

const onlyForm = state => state[FORM];

const onlyFields = state => Object
  .entries(state)
  .filter(([key]) => key !== FORM)
  .reduce(toFlatEntries, {});

const getIsValid = state => isDeeplyEmpty(onlyForm(state).error) &&
  Object.values(onlyFields(state)).every(value => value.error == null);

const getIsValidating = state =>
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
