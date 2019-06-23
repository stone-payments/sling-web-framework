export const isValidTel = value => {
  if (value == null) {
    return false;
  }

  const digits = value.replace(/\D/g, '');
  return /[0-9]+/g.test(value) && digits.length >= 10 && digits.length <= 11;
};
