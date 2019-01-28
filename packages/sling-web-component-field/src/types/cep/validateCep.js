import { isValidCep } from './isValidCep';

export const validateCep = value => (value && !isValidCep(value)
  ? 'Must be a valid CEP'
  : undefined);
