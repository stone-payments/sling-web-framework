import { maskMaker } from '../../helpers/maskMaker.js';

export const maskTel = maskMaker({
  phone: true,
  phoneRegionCode: 'BR'
});
