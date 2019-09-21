import { isValidBarcode } from '@stone-payments/emd-helpers';

export const validateBarcode = value => (value && !isValidBarcode(value)
  ? 'Deve ser um código de barras válido'
  : undefined);
