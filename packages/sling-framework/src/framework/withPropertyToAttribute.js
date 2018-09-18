import { globalHelper } from 'sling-helpers';
import { LitElement } from 'lit-element';

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
