export const PHONE_REGEXP = /^(\([0-9]{2}\)|[0-9]{2})\s?([0-9]{1})?([0-9]{4})-?([0-9]{4})$/;

export const isValidPhone = (arg = '') => PHONE_REGEXP.test(arg);
