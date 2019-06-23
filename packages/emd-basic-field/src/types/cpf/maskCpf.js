import { maskMaker } from '../../helpers/maskMaker.js';

export const maskCpf = maskMaker({
  numericOnly: true,
  delimiters: ['.', '.', '-'],
  blocks: [3, 3, 3, 2]
});
