import IMask from 'imask';

export const maskCpf = domEl => new IMask(domEl, {
  mask: '000.000.000-00',
});
