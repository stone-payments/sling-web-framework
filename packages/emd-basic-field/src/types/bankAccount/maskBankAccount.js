import { maskMaker } from '../../helpers/maskMaker.js';

export const maskBankAccount = maskMaker({
  mask: [
    { mask: '0' },
    { mask: '0-0' },
    { mask: '00-0' },
    { mask: '000-0' },
    { mask: '0000-0' },
    { mask: '00000-0' },
    { mask: '000000-0' },
    { mask: '0000000-0' },
    { mask: '00000000-0' },
    { mask: '000000000-0' },
    { mask: '0000000000-0' },
    { mask: '00000000000-0' },
    { mask: '000000000000-0' },
    { mask: '0000000000000-0' },
    { mask: '00000000000000-0' },
    { mask: '000000000000000-0' },
    { mask: '0000000000000000-0' }
  ]
});
