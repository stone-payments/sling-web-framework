import IMask from 'imask';

export const maskCep = domEl => new IMask(domEl, {
  mask: '00000-000',
});
