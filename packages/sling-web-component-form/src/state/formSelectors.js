import { setIn, toFlatEntries, isDeeplyEmpty } from 'sling-helpers';
import { FORM } from './constant.js';

export const onlyForm = state => state[FORM];

export const onlyFields = state => Object
  .entries(state)
  .filter(([key]) => key !== FORM)
  .reduce(toFlatEntries, {});

export const parseState = (state) => {
  const form = onlyForm(state);
  const fieldEntries = Object.entries(onlyFields(state));

  const dirty = Object.values(onlyFields(state))
    .some(field => field.value || field.touched);

  const errors = {
    ...fieldEntries.reduce((result, [fieldId, field]) =>
      setIn(result, `${fieldId}`, field.error), {}),
    ...form.error,
  };

  const values = fieldEntries.reduce((result, [fieldId, field]) =>
    setIn(result, fieldId, field.value), {});

  const touched = fieldEntries.reduce((result, [fieldId, field]) =>
    setIn(result, fieldId, field.touched), {});

  const isValid = isDeeplyEmpty(onlyForm(state).error) &&
    Object.values(onlyFields(state)).every(field => field.error == null);

  const isValidField = fieldEntries.reduce((result, [fieldId, field]) =>
    setIn(result, fieldId, field.error == null), {});

  const isValidating = Object.values(state)
    .some(field => field.isValidating === true);

  const isValidatingField = fieldEntries.reduce((result, [fieldId, field]) =>
    setIn(result, fieldId, field.isValidating), {});

  const validatedOnceOrMore = fieldEntries.reduce((result, [fieldId, field]) =>
    setIn(result, fieldId, field.validatedOnceOrMore), {});

  return {
    dirty,
    errors,
    values,
    touched,
    isValid,
    isValidField,
    isValidating,
    isValidatingField,
    validatedOnceOrMore,
  };
};
