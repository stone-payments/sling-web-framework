export const withRequired = validatorFunc => value => (!value
  ? 'Required field'
  : validatorFunc(value));
