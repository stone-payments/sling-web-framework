import { isValidBarcode } from '@stone-payments/emd-helpers';

export const validateBillet = value => (value && !isValidBarcode(value)
  ? 'Deve ser um código de barras válido'
  : undefined);
