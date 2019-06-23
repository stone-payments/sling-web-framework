import { getIn, toFlatObject } from '@stone-payments/emd-helpers';

import {
  APPEARANCE_MAP,
  DEFAULT_APPEARANCE,
  DEFAULT_HEAD_APPEARANCE
} from '../constants/appearance.js';

const getLineOption = (userObj, index) =>
  getIn(userObj, `nth[${index + 1}]`) || userObj.default;

const getLineOptionWithKey = (userObj, key, index, cellIndex) =>
  getIn(userObj, `nth[${index + 1}].${key}[${cellIndex}]`) ||
  getIn(userObj, `default.${key}[${cellIndex}]`);

const getUserOption = (userObj = {}, mainKey, key) =>
  getIn(userObj, `${mainKey}.${key}`) || userObj[key];

const expandStringOrArrayOption = (userValue, defaultValue, max = 0) => {
  return new Array(max)
    .fill(defaultValue)
    .map((opt, index) => Array.isArray(userValue)
      ? userValue[index] || opt
      : userValue);
};

const parseOption = (userObj = {}, mainKey, key, defaultValue, max) => {
  return {
    [key]: expandStringOrArrayOption(
      getUserOption(userObj, mainKey, key) || defaultValue,
      defaultValue,
      max
    )
  };
};

const parseOptions = (userObj = {}, mainKey, defaultObj = {}, max) => {
  return Object
    .entries(defaultObj)
    .map(([key, defaultValue]) =>
      parseOption(userObj, mainKey, key, defaultValue, max))
    .reduce(toFlatObject, {});
};

export const TableController = (Base = class {}) =>
  class extends Base {
    constructor () {
      super();
      this.handleRowClick = this.handleRowClick.bind(this);
      this.dispatchCustomEvent = this.dispatchCustomEvent.bind(this);
    }

    static get properties () {
      return {
        rows: {
          type: Object,
          reflect: false
        },
        header: {
          type: Object,
          reflect: false
        },
        appearance: {
          type: Object,
          reflect: false
        },
        headerappearance: {
          type: Object,
          reflect: false
        },
        adapter: {
          type: Object,
          reflect: false
        },
        clickablerows: {
          type: Boolean,
          reflect: true
        },
        expandedbody: {
          type: Boolean,
          reflect: true
        }
      };
    }

    static _parseAdapter (adapter) {
      return {
        default: adapter
          ? adapter.default || adapter || Object.values
          : Object.values,
        nth: adapter
          ? adapter.nth
          : {}
      };
    }

    static _parseStyles (appearance = {}, defaultStyles, maxColumns) {
      const userDefaultStyles = parseOptions(
        appearance,
        'default',
        defaultStyles,
        maxColumns
      );

      return {
        default: userDefaultStyles,
        nth: Object
          .keys(appearance.nth || {})
          .map(key => ({
            [key]: parseOptions(
              appearance.nth,
              key,
              userDefaultStyles,
              maxColumns
            )
          }))
          .reduce(toFlatObject, {})
      };
    }

    get _parsedAdapter () {
      return this.constructor._parseAdapter(this.adapter);
    }

    get _parsedStyles () {
      return this.constructor._parseStyles(
        this.appearance || {},
        DEFAULT_APPEARANCE,
        this.maxColumns
      );
    }

    get _parsedHeaderStyles () {
      const isDefinedInHeader = key =>
        getUserOption(this.headerappearance, 'default', key);

      let result = this.constructor._parseStyles(
        this.headerappearance || {},
        DEFAULT_HEAD_APPEARANCE,
        this.maxColumns
      );

      return {
        ...result,
        default: {
          ...result.default,
          align: isDefinedInHeader('align')
            ? result.default.align
            : this._parsedStyles.default.align,
          width: isDefinedInHeader('width')
            ? result.default.width
            : this._parsedStyles.default.width
        }
      };
    }

    get maxColumns () {
      return Math.max(0, ...this.matrix.map(row => row.length));
    }

    get matrix () {
      if ((this.rows || []).length > 0) {
        return this.rows.map((row, index) => {
          const currentAdapter = getLineOption(this._parsedAdapter, index);

          return currentAdapter({
            ...row,
            dispatch: this.dispatchCustomEvent(index)
          }, index);
        });
      }

      return [];
    }

    get matrixStyles () {
      return this.matrix.map((row, index) =>
        row.map((cell, cellIndex) => {
          return Object
            .keys(APPEARANCE_MAP)
            .map(key => ({
              [key]: getLineOptionWithKey(
                this._parsedStyles,
                key,
                index,
                cellIndex
              )
            }))
            .reduce(toFlatObject);
        })
      );
    }

    get headerRow () {
      return this.header || [];
    }

    get headerStyles () {
      return (this.header || []).map((cell, cellIndex) => Object
        .keys(APPEARANCE_MAP)
        .map(key => ({
          [key]: getLineOptionWithKey(
            this._parsedHeaderStyles,
            key,
            0,
            cellIndex
          )
        }))
        .reduce(toFlatObject, {})
      );
    }

    handleRowClick (index) {
      return () => {
        if (this.clickablerows) {
          this.dispatchEventAndMethod('rowclick', this.rows[index]);
        }
      };
    }

    dispatchCustomEvent (index) {
      return evtName => () => {
        this.dispatchEventAndMethod(evtName, this.rows[index]);
      };
    }

    render () {
      return this.currentView.apply(this);
    }
  };
