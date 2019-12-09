import { isValidCnpj } from '@stone-payments/emd-helpers';

export const validateCnpj = (value, ctx = {}) => (value && !isValidCnpj(value)
  ? ctx.defaulterror || 'Deve ser um CNPJ válido'
  : undefined);
