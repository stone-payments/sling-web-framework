import { maskMaker } from '../../helpers/maskMaker.js';

export const maskBarcode = maskMaker({
  numericOnly: true,
  delimiters: ['-', ' ', '-', ' ', '-', ' ', '-', ' '],
  blocks: [11, 1, 11, 1, 11, 1, 11, 1]
});

export const convenioMaskBarcode = maskMaker({
  numericOnly: true,
  delimiters: ['.', ' ', '.', ' ', '.', ' '],
  blocks: [5, 5, 5, 6, 5, 6, 1, 14]
});
