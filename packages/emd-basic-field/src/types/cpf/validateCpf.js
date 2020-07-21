import { isValidCpf } from '@stone-payments/emd-helpers';

export const validateCpf = value => (value && !isValidCpf(value)
  ? 'Deve ser um CPF válido'
  : undefined);
