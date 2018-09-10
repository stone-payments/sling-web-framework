export const isValidCNPJ = (arg = '') => {
  let strCNPJ = arg;

  let size;
  let numbers;
  let sum;
  let pos;
  let result;

  strCNPJ = strCNPJ.replace(/\D/g, '');

  if (strCNPJ === '') {
    return false;
  }

  if (strCNPJ.length !== 14) {
    return false;
  }

  if (strCNPJ === '00000000000000' ||
    strCNPJ === '11111111111111' ||
    strCNPJ === '22222222222222' ||
    strCNPJ === '33333333333333' ||
    strCNPJ === '44444444444444' ||
    strCNPJ === '55555555555555' ||
    strCNPJ === '66666666666666' ||
    strCNPJ === '77777777777777' ||
    strCNPJ === '88888888888888' ||
    strCNPJ === '99999999999999') {
    return false;
  }

  size = strCNPJ.length - 2;
  numbers = strCNPJ.substring(0, size);
  const digits = strCNPJ.substring(size);

  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i -= 1) {
    sum += numbers.charAt(size - i) * pos;
    pos -= 1;

    if (pos < 2) {
      pos = 9;
    }
  }

  result = sum % 11 < 2
    ? 0
    : 11 - (sum % 11);

  if (String(result) !== digits.charAt(0)) {
    return false;
  }

  size += 1;
  numbers = strCNPJ.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i -= 1) {
    sum += numbers.charAt(size - i) * pos;
    pos -= 1;

    if (pos < 2) {
      pos = 9;
    }
  }

  result = sum % 11 < 2
    ? 0
    : 11 - (sum % 11);

  if (String(result) !== digits.charAt(1)) {
    return false;
  }

  return true;
};
