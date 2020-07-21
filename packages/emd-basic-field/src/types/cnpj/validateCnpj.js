import { isValidCnpj } from '@stone-payments/emd-helpers';

export const validateCnpj = value => (value && !isValidCnpj(value)
  ? 'Deve ser um CNPJ válido'
  : undefined);
