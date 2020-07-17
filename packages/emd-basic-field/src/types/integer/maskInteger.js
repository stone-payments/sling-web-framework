import { maskMaker } from '../../helpers/maskMaker.js';

export const maskInteger = maskMaker({
  mask: /^\d+$/
});
