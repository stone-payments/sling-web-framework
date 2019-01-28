import { isFunction, toFlatEntries, toFlatObject } from 'sling-helpers';

const isValidEntry = ([, value]) => value != null && value !== '';

const PARAMS_QUEUE = Symbol('PARAMS_QUEUE');

export const withRequestParams = (Base = class {}) =>
  class extends Base {
    static get requestParamNames() {
      return super.requestParamNames || [];
    }

    static get requestAttrNames() {
      return this.requestParamNames.map(name => name.toLowerCase());
    }

    static get observedAttributes() {
      return [
        ...(super.observedAttributes || []),
        ...this.requestAttrNames,
      ];
    }

    constructor() {
      super();
      this.requestParams = {};
      this[PARAMS_QUEUE] = [];

      this.constructor.requestAttrNames
        .forEach((attrName) => {
          Object.defineProperty(this, attrName, {
            get() {
              return this.getAttribute(attrName);
            },
            set(value) {
              if (value == null) {
                this.removeAttribute(attrName);
              } else {
                this.setAttribute(attrName, value);
              }
            },
          });
        });
    }

    attributeChangedCallback(attrName, oldValue, newValue, ...args) {
      const { requestAttrNames, requestParamNames } = this.constructor;
      const requestAttrIndex = requestAttrNames.indexOf(attrName);

      const shouldUpdate = requestAttrIndex > -1 && oldValue !== newValue;
      const shouldTrigger = isFunction(this.requestParamsChangedCallback);

      if (shouldUpdate) {
        const changedParamName = requestParamNames[requestAttrIndex];
        const changedParam = { [changedParamName]: newValue || null };
        this[PARAMS_QUEUE].push(changedParam);
        const queueSize = this[PARAMS_QUEUE].length;

        Promise.resolve().then(() => {
          if (this[PARAMS_QUEUE].length === queueSize) {
            const allChanges = this[PARAMS_QUEUE].reduce(toFlatObject, {});

            this.requestParams = Object
              .entries({
                ...this.requestParams,
                ...allChanges,
              })
              .filter(isValidEntry)
              .reduce(toFlatEntries, {});

            if (shouldTrigger) {
              this.requestParamsChangedCallback(this.requestParams, allChanges);
            }

            this[PARAMS_QUEUE] = [];
          }
        });
      }

      if (isFunction(super.attributeChangedCallback)) {
        super.attributeChangedCallback(attrName, oldValue, newValue, ...args);
      }
    }
  };
