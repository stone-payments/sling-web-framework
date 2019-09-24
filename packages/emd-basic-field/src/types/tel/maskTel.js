import { maskMaker } from '../../helpers/maskMaker.js';

export const maskTel = maskMaker({
  mask: [{
    mask: '(00) 0000-0000'
  }, {
    mask: '(00) 00000-0000'
  }]
});
