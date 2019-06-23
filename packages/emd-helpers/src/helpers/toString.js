export const toString = value =>
  (value == null || Number.isNaN(value)) ? '' : String(value);
