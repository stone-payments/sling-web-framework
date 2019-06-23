export const isValidCpf = (arg = '') => {
  let strCpf = arg;

  strCpf = strCpf.replace(/\D/g, '');

  if (strCpf.length !== 11) {
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
