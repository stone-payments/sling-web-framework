import IMask from 'imask';

export const maskTel = domEl => new IMask(domEl, {
  mask: [{
    mask: '(00) 0000-0000',
  }, {
    mask: '(00) 00000-0000',
  }],
  dispatch(appended, dynamicMasked) {
    if ((dynamicMasked.value + appended).length < 15) {
      return dynamicMasked.compiledMasks[0];
    }
    return dynamicMasked.compiledMasks[1];
  },
});
