import { setIn, toFlatEntries, isDeeplyEmpty } from 'sling-helpers';
import { FORM } from './constant.js';

export const onlyForm = state => state[FORM];

export const onlyFields = state => Object
  .entries(state)
  .filter(([key]) => key !== FORM)
  .reduce(toFlatEntries, {});

const parseDirty = state => Object.values(onlyFields(state))
  .some(item => item.value || item.touched);

const parseIsValid = state => isDeeplyEmpty(onlyForm(state).error) &&
  Object.values(onlyFields(state)).every(item => item.error == null);

const parseIsValidating = state =>
  Object.values(state).some(item => item.isValidating === true);

export const parseState = (state) => {
  const form = onlyForm(state);
  const fieldEntries = Object.entries(onlyFields(state));

  const dirty = parseDirty(state);

  const errors = {
    ...form.error,
    ...fieldEntries.reduce((result, [fieldId, obj]) =>
      setIn(result, `${fieldId}`, obj.error), {}),
  };

  const values = fieldEntries.reduce((result, [fieldId, obj]) =>
    setIn(result, fieldId, obj.value), {});

  const touched = fieldEntries.reduce((result, [fieldId, obj]) =>
    setIn(result, fieldId, obj.touched), {});

  const used = fieldEntries.reduce((result, [fieldId, obj]) =>
    setIn(result, fieldId, obj.used), {});

  const isValidatingField = fieldEntries.reduce((result, [fieldId, obj]) =>
    setIn(result, fieldId, obj.isValidating), {});

  const isValid = parseIsValid(state);

  const isValidating = parseIsValidating(state);

  return {
    dirty,
    errors,
    values,
    touched,
    used,
    isValid,
    isValidating,
    isValidatingField,
  };
};
