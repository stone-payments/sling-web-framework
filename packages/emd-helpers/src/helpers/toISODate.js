import { parse } from 'date-fns';

export const toISODate = date => parse(date).toISOString();
