export const validate = (scope, formdata) => ({
  with: (validators, errorMaker) => {
    let values;
    let isValid;

    if (Array.isArray(scope)) {
      values = Object
        .entries(formdata)
        .filter(([key]) => scope.includes(key))
        .map(([, value]) => value);
    } else if (typeof scope === 'string') {
      values = formdata[scope];
    } else {
      values = Object.values(formdata);
    }

    if (Array.isArray(validators)) {
      isValid = validators.every(validator => validator(values));
    } else if (typeof validators === 'function') {
      isValid = validators(values);
    } else {
      isValid = false;
    }

    const target = (typeof scope === 'string')
      ? scope
      : undefined;

    const error = (typeof errorMaker === 'string')
      ? errorMaker
      : errorMaker(scope, formdata);

    return {
      isValid,
      target,
      error: isValid ? undefined : error,
    };
  },
});
