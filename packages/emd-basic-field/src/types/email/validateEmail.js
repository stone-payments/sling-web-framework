import { isValidEmail } from '@stone-payments/emd-helpers';

export const validateEmail = value => (value && !isValidEmail(value)
  ? 'Deve ser um e-mail válido'
  : undefined);
