import {
  NEW_DEFAULT_APPEARANCE
} from '../constants/appearance.js';

export const expandString = (str, max) => Array(max).fill(str);

export const completeWithDefault = (arr, defStr, max) => {
  const str = defStr || arr[0];

  return expandString(str, max)
    .map((item, index) => arr[index] != null ? arr[index] : item);
};

export const expandBranch = (branch, defMap, max) => {
  return Object
    .entries(branch)
    .reduce((result, [key, value]) => {
      const valueType = Array.isArray(value) ? 'array' : typeof value;
      let parsedValue;

      switch (valueType) {
        case 'array':
          parsedValue = completeWithDefault(value, defMap[key], max);
          break;

        case 'string':
          parsedValue = expandString(value, max);
          break;

        default:
          parsedValue = value;
      }

      return {
        ...result,
        [key]: parsedValue
      };
    }, {});
};

const appearance = {
  textAlign: 'left',
  borderColor: ['#909', '#303']
};

expandBranch(appearance, NEW_DEFAULT_APPEARANCE, 4); // ?
