export const compose = (...fns) =>
  fns.reduceRight((prevFn, nextFn) =>
    (...args) => nextFn(prevFn(...args)), value => value);
