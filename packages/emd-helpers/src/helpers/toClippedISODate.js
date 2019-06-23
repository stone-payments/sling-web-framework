import { toISODate } from './toISODate.js';

export const toClippedISODate = date => toISODate(date).slice(0, 10);
