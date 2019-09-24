import { maskMaker } from '../../helpers/maskMaker.js';

export const maskMoney = maskMaker({
  mask: 'R$ num',
  blocks: {
    num: {
      mask: Number,
      thousandsSeparator: '.',
      padFractionalZeros: true,
      signed: true
    }
  }
});
