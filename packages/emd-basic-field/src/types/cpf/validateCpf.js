import { isValidCpf } from '@stone-payments/emd-helpers';

export const validateCpf = (value, ctx = {}) => (value && !isValidCpf(value)
  ? ctx.defaulterror || 'Deve ser um CPF válido'
  : undefined);
