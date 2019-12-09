import { isValidTel } from '@stone-payments/emd-helpers';

export const validateTel = (value, ctx = {}) => (value && !isValidTel(value)
  ? ctx.defaulterror || 'Deve ser um número de telefone válido'
  : undefined);
