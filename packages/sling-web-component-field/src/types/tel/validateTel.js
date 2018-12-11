export const TEL_REGEXP = /^(\([0-9]{2}\)|[0-9]{2})\s?([0-9]{1})?([0-9]{4})-?([0-9]{4})$/;

export const validatePhone = value => (!TEL_REGEXP.test(value)
  ? 'Must be a valid telephone number'
  : undefined);
