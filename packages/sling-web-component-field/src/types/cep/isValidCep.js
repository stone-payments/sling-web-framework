export const isValidCep = (arg = '') => {
  let strCpf = arg;

  strCpf = strCpf.replace(/\D/g, '');

  if (strCpf === '00000000') {
    return false;
  }

  if (strCpf.length !== 8) {
    return false;
  }

  if (strCpf === '00000000' ||
      strCpf === '11111111' ||
      strCpf === '22222222' ||
      strCpf === '33333333' ||
      strCpf === '44444444' ||
      strCpf === '55555555' ||
      strCpf === '66666666' ||
      strCpf === '77777777' ||
      strCpf === '88888888' ||
      strCpf === '99999999') {
    return false;
  }

  return true;
};
