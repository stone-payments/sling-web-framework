import { isValidTel } from '@stone-payments/emd-helpers';

export const validateTel = value => (value && !isValidTel(value)
  ? 'Deve ser um número de telefone válido'
  : undefined);
