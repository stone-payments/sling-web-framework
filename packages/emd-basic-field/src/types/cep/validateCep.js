import { isValidCep } from '@stone-payments/emd-helpers';

export const validateCep = (value, ctx = {}) => (value && !isValidCep(value)
  ? ctx.defaulterror || 'Deve ser um CEP válido'
  : undefined);
