import { toISODate } from './toISODate.js';

export const toISODateFn = dateFn => (...args) => toISODate(dateFn(...args));
