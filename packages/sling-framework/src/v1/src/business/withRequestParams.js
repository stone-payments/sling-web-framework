import { isFunction, toFlatEntries } from 'sling-helpers';

const isValidParam = param => param != null && param !== '';

export const withRequestParams = (Base = HTMLElement) =>
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

      const shouldTrigger = requestAttrIndex > -1 &&
        isFunction(this.onRequestParamChanged) &&
        oldValue !== newValue;

      if (shouldTrigger) {
        const changedParamName = requestParamNames[requestAttrIndex];
        const changedParam = { [changedParamName]: newValue || null };

        this.requestParams = Object
          .entries({
            ...this.requestParams,
            ...changedParam,
          })
          .filter(([, value]) => isValidParam(value))
          .reduce(toFlatEntries, {});

        this.onRequestParamChanged(this.requestParams, changedParam);
      }

      if (isFunction(super.attributeChangedCallback)) {
        super.attributeChangedCallback(attrName, oldValue, newValue, ...args);
      }
    }
  };
