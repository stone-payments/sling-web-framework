import { isValidCpf } from './isValidCpf';

export const validateCpf = value => (value && !isValidCpf(value)
  ? 'Must be a valid CPF'
  : undefined);
