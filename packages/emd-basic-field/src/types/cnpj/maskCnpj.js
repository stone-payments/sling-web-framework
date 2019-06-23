import { maskMaker } from '../../helpers/maskMaker.js';

export const maskCnpj = maskMaker({
  numericOnly: true,
  delimiters: ['.', '.', '/', '-'],
  blocks: [2, 3, 3, 4, 2]
});
