import 'moment/locale/pt-br';
import moment from 'moment/moment';
import { setIn as timmSetIn, getIn as timmGetIn } from 'timm';
import isPlainObject from 'is-plain-object';

moment.locale('pt-BR');

export { omit, mergeDeep } from 'timm';

export const isString = arg =>
  typeof arg === 'string' || arg instanceof String;

export const isFunction = arg => typeof arg === 'function';

export const isArray = arg => Array.isArray(arg);

export const isPromise = arg => arg != null && isFunction(arg.then);

export const createRangeArray = (start, end = start) =>
  Array.from(Array(1 + (end - start)).keys()).map(item => item + start);

export const isDateRange = (startDate, finalDate) => startDate !== finalDate;

export const getDateRangeArray = (startDateStr, finalDateStr, dateFormat) => {
  const dateRangeDays = [];
  for (const currentDate = moment(startDateStr);
    currentDate <= moment(finalDateStr);
    currentDate.add(1, 'days')) {
    dateRangeDays.push(currentDate.format(dateFormat));
  }

  return dateRangeDays;
};

export const toFlatArray = (result, arg) => (Array.isArray(arg)
  ? [...result, ...arg]
  : [...result, arg]);

export const toFlatArrayDeep = (result, arg) => (Array.isArray(arg)
  ? [...result, ...arg.reduce(toFlatArrayDeep, [])]
  : [...result, arg]);

export const toFlatObject = (result, obj) => ({ ...result, ...obj });

export const toFlatEntries = (result, [key, value]) =>
  ({ ...result, [key]: value });

export const pickBy = (obj, fn) => Object.entries(obj)
  .filter(([key, value]) => fn(value, key))
  .reduce(toFlatEntries, {});

export const parsePath = (path = []) => (isString(path)
  ? path
    .replace(/['"\]]/g, '')
    .split(/[.[]/g)
    .filter(item => item !== '')
  : path);

export const get = (target = {}, path) => {
  const keys = parsePath(path);

  return keys.reduce((result, key) =>
    (result != null ? result[key] : result), target);
};

export const set = (target = {}, path, value) => {
  const keys = parsePath(path);
  const [key, ...nextKeys] = keys;

  const nextValue = (nextKeys.length > 0)
    ? set(target[key], nextKeys, value)
    : value;

  return {
    ...target,
    [key]: nextValue,
  };
};

export const groupByDeep = (collection = [], ...iteratees) => {
  const paths = collection.map(value => iteratees
    .map(iteratee => iteratee(value)));

  return paths.reduce((result, path, index) => {
    const currentValue = get(result, path) || [];
    const newValue = currentValue.concat([collection[index]]);

    return { ...result, ...set(result, path, newValue) };
  }, {});
};

export const mapByKey = (collection = [], key, value) =>
  collection.reduce((acc, actual) => {
    acc[actual[key]] = actual[value];
    return acc;
  }, {});

export const sleep = ms =>
  new Promise(resolve => setTimeout(resolve, ms));

export const toPath = str => str
  .replace(/\]$/g, '')
  .replace(/(\[|\])/g, '.')
  .replace(/\.{2,}/g, '.')
  .split('.')
  .map(key => (!Number.isNaN(Number(key)) ? Number(key) : key));

export const fromPath = path => path
  .map(key => (!Number.isNaN(Number(key)) ? `[${String(key)}]` : String(key)))
  .join('.')
  .replace(/\.\[/g, '[');

export const setIn = (obj, path, value) => {
  const normalizedPath = toPath(path);
  return timmSetIn(obj, normalizedPath, value);
};

export const getIn = (obj, path) => {
  const normalizedPath = toPath(path);
  return timmGetIn(obj, normalizedPath);
};

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

export const mergeUnique = (...arrays) => [...new Set(arrays
  .reduce((result, arr) => [...result, ...arr], []))];

export const compose = (...fns) =>
  fns.reduceRight((prevFn, nextFn) =>
    (...args) => nextFn(prevFn(...args)), value => value);

export const flatten = (obj) => {
  const step = (currentKey, into, target = {}) => {
    Object
      .keys(into)
      .forEach((key) => {
        let newKey = key;
        const newVal = into[key];

        if (currentKey.length > 0) {
          const endKey = Number.isNaN(Number(key)) ? key : `[${key}]`;
          newKey = `${currentKey}.${endKey}`.replace('.[', '[');
        }

        if (typeof newVal === 'object') {
          step(newKey, newVal, target);
        } else {
          target[newKey] = newVal;
        }
      });
  };

  const result = {};
  step('', obj, result);
  return result;
};
