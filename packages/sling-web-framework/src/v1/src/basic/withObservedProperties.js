import { LitElement } from '../lib/lit-element.bundle.js';
import { globalHelper } from '../../../../node_modules/sling-web-helpers/src/index.js';

export const withObservedProperties = (Base = LitElement) =>
  class extends Base {
    static get observedProperties() {
      return globalHelper.pickBy(this.properties || {},
        ({ observer }) => observer != null);
    }

    _propertiesChanged(props, changedProps, oldProps, ...lastArgs) {
      super._propertiesChanged(props, changedProps, oldProps, ...lastArgs);

      const { observedProperties } = this.constructor;
      const observedPropertyNames = Object.keys(observedProperties);

      Object
        .entries(changedProps || {})
        .filter(([propName]) => observedPropertyNames.includes(propName))
        .forEach(([propName, propValue]) => {
          const newValue = propValue;
          const oldValue = oldProps[propName];
          const callback = observedProperties[propName].observer;

          const fn = globalHelper.isFunction(callback)
            ? callback.bind(this)
            : this[callback].bind(this);

          fn(newValue, oldValue);
        });
    }
  };
