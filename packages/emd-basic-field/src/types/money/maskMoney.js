import { maskMaker } from '../../helpers/maskMaker.js';

export const maskMoney = maskMaker({
  numeral: true,
  prefix: 'R$ ',
  numeralDecimalMark: ',',
  delimiter: '.',
  noImmediatePrefix: true,
  rawValueTrimPrefix: true
});
