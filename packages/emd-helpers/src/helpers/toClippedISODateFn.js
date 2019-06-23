import { toClippedISODate } from './toClippedISODate.js';

export const toClippedISODateFn = dateFn => (...args) =>
  toClippedISODate(dateFn(...args));
