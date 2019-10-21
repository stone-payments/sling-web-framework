import { maskMaker } from '../../helpers/maskMaker.js';

export const maskCpfCnpj = maskMaker({
  mask: [{
    mask: '000.000.000-00'
  }, {
    mask: '00.000.000/0000-00'
  }]
});
