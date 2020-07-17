import { isValidCnpj, isValidCpf } from '@stone-payments/emd-helpers';

export const validateCpfCnpj = value =>
  (value && !(isValidCpf(value) || isValidCnpj(value))
    ? 'Deve ser um CPF ou um CNPJ válido'
    : undefined);
