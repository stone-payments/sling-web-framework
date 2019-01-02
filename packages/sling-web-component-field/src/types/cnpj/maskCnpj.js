import IMask from 'imask';

export const maskCnpj = domEl => new IMask(domEl, {
  mask: '00.000.000/0000-00',
});
