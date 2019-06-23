import isPlainObject from 'is-plain-object';

export const isDeeplyEmpty = items => (items == null) ||
  Object
    .values(items)
    .map((value) => {
      if (isPlainObject(value)) {
        return isDeeplyEmpty(value);
      }

      if (Array.isArray(value)) {
        return value.every(isDeeplyEmpty);
      }

      return value == null;
    })
    .filter(hasError => !hasError)
    .length === 0;
