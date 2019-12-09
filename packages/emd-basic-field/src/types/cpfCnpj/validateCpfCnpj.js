import { isValidCnpj, isValidCpf } from '@stone-payments/emd-helpers';

export const validateCpfCnpj = (value, ctx = {}) =>
  (value && !(isValidCpf(value) || isValidCnpj(value))
    ? ctx.defaulterror || 'Deve ser um CPF ou um CNPJ válido'
    : undefined);
