import { maskMaker } from '../../helpers/maskMaker.js';

export const maskCep = maskMaker({
  numericOnly: true,
  delimiter: '-',
  blocks: [5, 3]
});
