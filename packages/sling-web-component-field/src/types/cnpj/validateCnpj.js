import { isValidCnpj } from './isValidCnpj';

export const validateCnpj = value => (value && !isValidCnpj(value)
  ? 'Must be a valid CNPJ'
  : undefined);
