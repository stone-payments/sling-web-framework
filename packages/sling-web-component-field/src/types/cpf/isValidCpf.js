export const isValidCpf = (arg = '') => {
  let strCpf = arg;

  strCpf = strCpf.replace(/\D/g, '');

  if (strCpf === '00000000000') {
    return false;
  }

  if (strCpf.length !== 11) {
    return false;
  }

  if (strCpf === '00000000000' ||
    strCpf === '11111111111' ||
    strCpf === '22222222222' ||
    strCpf === '33333333333' ||
    strCpf === '44444444444' ||
    strCpf === '55555555555' ||
    strCpf === '66666666666' ||
    strCpf === '77777777777' ||
    strCpf === '88888888888' ||
    strCpf === '99999999999') {
    return false;
  }

  let sum;
  let rest;

  sum = 0;

  for (let i = 1; i <= 9; i += 1) {
    sum += parseInt(strCpf.substring(i - 1, i), 10) * (11 - i);
  }

  rest = (sum * 10) % 11;

  if ((rest === 10) || (rest === 11)) {
    rest = 0;
  }

  if (rest !== parseInt(strCpf.substring(9, 10), 10)) {
    return false;
  }

  sum = 0;

  for (let i = 1; i <= 10; i += 1) {
    sum += parseInt(strCpf.substring(i - 1, i), 10) * (12 - i);
  }

  rest = (sum * 10) % 11;

  if ((rest === 10) || (rest === 11)) {
    rest = 0;
  }

  if (rest !== parseInt(strCpf.substring(10, 11), 10)) {
    return false;
  }

  return true;
};
