export const isValidCep = (arg = '') => {
  let strCep = arg;

  strCep = strCep.replace(/\D/g, '');

  if (strCep === '') {
    return false;
  }

  if (strCep.length !== 8) {
    return false;
  }

  if (strCep === '00000000' ||
      strCep === '11111111' ||
      strCep === '22222222' ||
      strCep === '33333333' ||
      strCep === '44444444' ||
      strCep === '55555555' ||
      strCep === '66666666' ||
      strCep === '77777777' ||
      strCep === '88888888' ||
      strCep === '99999999') {
    return false;
  }

  return true;
};
