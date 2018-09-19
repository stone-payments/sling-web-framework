import { pickBy, isFunction } from 'sling-helpers';
import { LitElement } from '../lib/lit-element.bundle.js';

export const withObservedProperties = (Base = LitElement) =>
  class extends Base {
    static get _observedProperties() {
      return pickBy(this.properties || {},
        ({ observer }) => observer != null);
    }

    _propertiesChanged(props, changedProps, oldProps, ...lastArgs) {
      super._propertiesChanged(props, changedProps, oldProps, ...lastArgs);
      this._triggerObservedCallbacks(changedProps, oldProps);
    }

    _triggerObservedCallbacks(changedProps, oldProps) {
      const { _observedProperties } = this.constructor;
      const _observedPropertyNames = Object.keys(_observedProperties);

      Object
        .entries(changedProps || {})
        .filter(([propName]) => _observedPropertyNames.includes(propName))
        .forEach(([propName, propValue]) => {
          const newValue = propValue;
          const oldValue = oldProps[propName];
          const callback = _observedProperties[propName].observer;

          const fn = isFunction(callback)
            ? callback.bind(this)
            : this[callback].bind(this);

          fn(newValue, oldValue);
        });
    }
  };
