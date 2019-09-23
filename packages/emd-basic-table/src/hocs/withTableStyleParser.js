import { toDashCase } from '@stone-payments/emd-helpers';

export const withTableStyleParser = (Base = class {}) => class extends Base {
  static _expandValueToArray (value, max) {
    return Array(max).fill(value);
  }

  static _completeWithDefault (arr, defValue, max) {
    return this._expandValueToArray(defValue || null, max)
      .map((item, index) => arr[index] != null ? arr[index] : item);
  }

  static expandStyle (style = {}, defaults, max, options = {}) {
    return Object
      .entries(style)
      .reduce((result, [key, value]) => {
        const { exclude, only } = options;
        const valueType = Array.isArray(value) ? 'array' : typeof value;
        let parsedValue;

        if (exclude) {
          if (exclude.includes(key)) {
            return result;
          }
        } else if (only && !only.includes(key)) {
          return result;
        }

        switch (valueType) {
          case 'array':
            parsedValue = this._completeWithDefault(value, defaults[key], max);
            break;

          case 'string':
            parsedValue = this._expandValueToArray(value, max);
            break;

          default:
            parsedValue = value;
        }

        return {
          ...result,
          [key]: parsedValue
        };
      }, {});
  }

  static stringifyExpandedStyle (expandedStyle, max) {
    if (typeof expandedStyle !== 'object') {
      return '';
    }

    return Array(max).fill().map((item, index) => {
      return Object
        .entries(expandedStyle)
        .reduce((result, [key, values]) => {
          const value = values[index];

          return value != null
            ? `${result} ${[toDashCase(key)]}: ${values[index]};`.trim()
            : result;
        }, '');
    });
  }
};
