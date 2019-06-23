import { setIn, toFlatEntries, isDeeplyEmpty } from '@stone-payments/emd-helpers';
import { FORM } from './constant.js';

export const onlyForm = state => state[FORM];

export const onlyFields = state => Object
  .entries(state)
  .filter(([key]) => key !== FORM)
  .reduce(toFlatEntries, {});

export const parseState = (byIdState) => {
  const form = onlyForm(byIdState);
  const fieldEntries = Object.entries(onlyFields(byIdState));

  const dirty = Object.values(onlyFields(byIdState))
    .some(field => field.value || field.touched);

  const errors = {
    ...fieldEntries.reduce((result, [fieldId, field]) =>
      setIn(result, `${fieldId}`, field.error), {}),
    ...form.error
  };

  const values = fieldEntries.reduce((result, [fieldId, field]) =>
    setIn(result, fieldId, field.value), {});

  const touched = fieldEntries.reduce((result, [fieldId, field]) =>
    setIn(result, fieldId, field.touched), {});

  const isValid = isDeeplyEmpty(onlyForm(byIdState).error) &&
    Object.values(onlyFields(byIdState)).every(field => field.error == null);

  const isValidField = fieldEntries.reduce((result, [fieldId, field]) =>
    setIn(result, fieldId, field.error == null), {});

  const isValidating = Object.values(byIdState)
    .some(field => field.isValidating === true);

  const isValidatingField = fieldEntries.reduce((result, [fieldId, field]) =>
    setIn(result, fieldId, field.isValidating), {});

  return {
    dirty,
    errors,
    values,
    touched,
    isValid,
    isValidField,
    isValidating,
    isValidatingField
  };
};
