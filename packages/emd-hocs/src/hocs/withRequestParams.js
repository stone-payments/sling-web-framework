import {
  isFunction,
  toFlatEntries,
  toFlatObject
} from '@stone-payments/emd-helpers';

const isValidEntry = ([key, value]) => value != null && value !== '';

export const withRequestParams = (Base = class {}) =>
  class extends Base {
    static get requestParamNames () {
      return super.requestParamNames || [];
    }

    static get _requestAttrNames () {
      return this.requestParamNames.map(name => name.toLowerCase());
    }

    static get observedAttributes () {
      return [
        ...(super.observedAttributes || []),
        ...this._requestAttrNames
      ];
    }

    get receivedAllRequestParams () {
      const { requestParamNames } = this.constructor;

      return requestParamNames
        .every(param => Object.keys(this.requestParams).includes(param));
    }

    receivedSomeRequestParams (requestParamNames) {
      return requestParamNames
        .every(param => Object.keys(this.requestParams).includes(param));
    }

    constructor () {
      super();
      this.requestParams = {};
      this._changesQueue = [];

      this.constructor._requestAttrNames
        .forEach(attrName => {
          this._defineGettersAndSetters(attrName);
        });

      this.constructor.requestParamNames
        .filter(name => !this.constructor._requestAttrNames.includes(name))
        .forEach(paramName => {
          this._defineGettersAndSetters(paramName.toLowerCase(), paramName);
        });
    }

    _defineGettersAndSetters (attrName, paramName = attrName) {
      Object.defineProperty(this, paramName, {
        get () {
          return this.getAttribute(attrName);
        },
        set (value) {
          if (value == null) {
            this.removeAttribute(attrName);
          } else {
            this.setAttribute(attrName, value);
          }
        }
      });
    }

    attributeChangedCallback (attrName, pastValue, nextValue) {
      const { _requestAttrNames, requestParamNames } = this.constructor;
      const requestAttrIndex = _requestAttrNames.indexOf(attrName);

      const shouldUpdate = requestAttrIndex > -1 && pastValue !== nextValue;
      const shouldTrigger = isFunction(this.requestParamsChangedCallback);

      if (shouldUpdate) {
        const changedParamName = requestParamNames[requestAttrIndex];
        const changedParam = { [changedParamName]: nextValue || null };
        this._changesQueue.push(changedParam);
        const queueSize = this._changesQueue.length;

        Promise.resolve().then(() => {
          if (this._changesQueue.length === queueSize) {
            const allChanges = this._changesQueue.reduce(toFlatObject, {});

            this.requestParams = Object
              .entries({
                ...this.requestParams,
                ...allChanges
              })
              .filter(isValidEntry)
              .reduce(toFlatEntries, {});

            if (shouldTrigger) {
              this.requestParamsChangedCallback(this.requestParams, allChanges);
            }

            this._changesQueue = [];
          }
        });
      }

      if (isFunction(super.attributeChangedCallback)) {
        super.attributeChangedCallback(attrName, pastValue, nextValue);
      }
    }
  };
