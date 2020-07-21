import { isValidCep } from '@stone-payments/emd-helpers';

export const validateCep = value => (value && !isValidCep(value)
  ? 'Deve ser um CEP válido'
  : undefined);
