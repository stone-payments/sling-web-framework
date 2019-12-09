import { isValidBarcode } from '@stone-payments/emd-helpers';

export const validateBillet = (value, ctx = {}) =>
  (value && !isValidBarcode(value)
    ? ctx.defaulterror || 'Deve ser um código de barras válido'
    : undefined);
