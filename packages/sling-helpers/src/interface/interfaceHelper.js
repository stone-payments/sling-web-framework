import { isFunction } from '../global/globalHelper.js';

const VALID_PRIMITIVES = [String, Number, Boolean, Array, Object];

const isValidPrimitive = primitive => VALID_PRIMITIVES.includes(primitive);

const isWrappedAssertion = assertion =>
  !isValidPrimitive(assertion) &&
  assertion !== Function &&
  isFunction(assertion);

const isValidAssertion = assertion =>
  isValidPrimitive(assertion) ||
  isWrappedAssertion(assertion);

export const NULLABLE = Symbol('NULLABLE');

export const nullable = assertion => () => ({
  type: NULLABLE,
  assertion,
});

export const ARRAY_OF = Symbol('ARRAY_OF');

export const arrayOf = primitive => () => {
  if (!isValidPrimitive(primitive)) {
    throw new Error(`Invalid parameter: "${primitive}". It should be one of String, ` +
      'Number, Boolean, Array or Object primitives.');
  }

  return {
    type: ARRAY_OF,
    primitive,
  };
};

const isNullable = arg => isWrappedAssertion(arg) && arg().type === NULLABLE;

const checkMatch = (value, assertion) => {
  const type = isWrappedAssertion(assertion)
    ? assertion().type
    : undefined;

  const primitive = isWrappedAssertion(assertion)
    ? assertion().primitive
    : assertion;

  switch (type) {
    case ARRAY_OF:
      return Array.isArray(value) &&
        value.every(item => checkMatch(item, primitive));

    default:
      return value.constructor === primitive;
  }
};

const checkMatchWith = obj => (result, [key, assertion]) => {
  if (!isValidAssertion(assertion)) {
    throw new Error(`Invalid assertion: "${assertion}".`);
  }

  const isNullableAssertion = isNullable(assertion);
  let parsedAssertion = assertion;

  if (isNullable(assertion)) {
    parsedAssertion = assertion().assertion;
  }

  const partial = (isNullableAssertion)
    ? obj[key] == null || checkMatch(obj[key], parsedAssertion)
    : obj[key] != null && checkMatch(obj[key], parsedAssertion);

  return [...result, partial];
};

const makeEntryNullable = ([key, value]) => {
  const nullableValue = isNullable(value) ? value : nullable(value);
  return [key, nullableValue];
};

const matchesInterfaceWithMap = mapFunc => interfc => (obj) => {
  const entriesMatch = Object
    .entries(interfc)
    .map(mapFunc)
    .reduce(checkMatchWith(obj), [])
    .every(item => item === true);

  const hasSameKeys = Object
    .keys(obj)
    .every(objKey => interfc[objKey] != null);

  return entriesMatch && hasSameKeys;
};

export const matchesInterface =
  matchesInterfaceWithMap(entry => entry);

export const matchesInterfacePartially =
  matchesInterfaceWithMap(makeEntryNullable);
