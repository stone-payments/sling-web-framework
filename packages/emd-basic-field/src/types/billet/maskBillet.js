import { maskMaker } from '../../helpers/maskMaker.js';

export const maskBillet = maskMaker({
  mask: [{
    mask: '00000000000-0 00000000000-0 00000000000-0 00000000000-0',
    startsWith: '8'
  }, {
    mask: '00000.00000 00000.000000 00000.000000 0 00000000000000',
    startsWith: ''
  }],
  dispatch: function (appended, { value, compiledMasks }) {
    return compiledMasks.find(mask =>
      `${value}${appended}`.startsWith(mask.startsWith));
  }
});
