import { globalHelper } from '../../node_modules/sling-web-helpers/src/index.js';
import { LitElement } from '../lib/lit-element.bundle.js';

export const withPropertyToAttribute = (Base = LitElement) =>
  class extends Base {
    static get _reflectedProperties() {
      return globalHelper.pickBy(this.properties || {},
        ({ reflectToAttribute }) => reflectToAttribute);
    }

    _propertiesChanged(props, changedProps, ...lastArgs) {
      super._propertiesChanged(props, changedProps, ...lastArgs);
      this._reflectPropertiesToAttributes(changedProps);
    }

    _reflectPropertiesToAttributes(changedProps) {
      const { _reflectedProperties } = this.constructor;
      const _reflectedPropertyNames = Object.keys(_reflectedProperties);

      Object
        .entries(changedProps || {})
        .filter(([propName]) => _reflectedPropertyNames.includes(propName))
        .forEach(([propName, propValue]) => {
          if (propValue == null || propValue === false) {
            this.removeAttribute(propName);
          } else {
            const parsedValue = propValue === true ? '' : propValue;
            this.setAttribute(propName, parsedValue);
          }
        });
    }
  };
