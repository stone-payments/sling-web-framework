export const isValidCep = (arg = '') => {
  let strCep = arg;

  strCep = strCep.replace(/\D/g, '');

  if (strCep === '') {
    return false;
  }

  if (strCep.length !== 8) {
    return false;
  }

  return true;
};
