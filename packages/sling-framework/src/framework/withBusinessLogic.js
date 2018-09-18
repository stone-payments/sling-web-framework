import { globalHelper, onSdkAvailable } from 'sling-helpers';
import { LitElement } from '@polymer/lit-element';

export const withBusinessLogic = (Base = LitElement) =>
  class extends Base {
    constructor() {
      super();
      this.requestParams = {};
      this.lastRequestParams = {};
    }

    static get properties() {
      return {
        stonecode: {
          type: String,
          reflectToAttribute: true,
          callSdk: 'required',
        },
        apitoken: {
          type: String,
          reflectToAttribute: true,
          callSdk: 'required',
        },
        apiurl: {
          type: String,
          reflectToAttribute: true,
          callSdk: 'optional',
        },
        loading: {
          type: Number,
          reflectToAttribute: true,
        },
        errors: {
          type: Array,
        },
        apidata: {
          type: Array,
          value: [],
        },
      };
    }

    static get _observedRequestParams() {
      return globalHelper
        .pickBy(this.properties, ({ callSdk }) => callSdk);
    }

    static get _observedRequiredRequestParams() {
      return globalHelper
        .pickBy(this.properties, ({ callSdk }) => callSdk === 'required');
    }

    _propertiesChanged(original, changes, ...args) {
      super._propertiesChanged(original, changes, ...args);

      const { _observedRequestParams } = this.constructor;
      const sdkTriggering = Object.keys(_observedRequestParams);
      const changedProps = Object.keys(changes || {});

      if (changedProps.some(changedProp =>
        sdkTriggering.includes(changedProp))) {
        this._triggerSdkCall();
      }
    }

    get _shouldTriggerSdkCall() {
      const { requestParams = {}, lastRequestParams = {} } = this;
      const requestKeys = Object.keys(requestParams);
      const lastRequestKeys = Object.keys(lastRequestParams);

      const requiredParamNames = Object.keys(this.constructor
        ._observedRequiredRequestParams || {});

      const isSameRequest = requestKeys.length === lastRequestKeys.length &&
        requestKeys.every(key => String(requestParams[key]) ===
          String(lastRequestParams[key]));

      const hasAllRequiredParams = requiredParamNames
        .every(param => this[param]);

      return !isSameRequest && hasAllRequiredParams;
    }

    _triggerSdkCall() {
      onSdkAvailable().then(() => {
        const { _observedRequestParams } = this.constructor;

        this.requestParams = Object
          .keys(_observedRequestParams)
          .map(key => ({ [key]: this[key] }))
          .reduce((result, obj) => ({ ...result, ...obj }), {});

        if (this._shouldTriggerSdkCall) {
          if (globalHelper.isFunction(this.getdata)) {
            this.getdata(this.requestParams, this.instance);
          }
        }

        this.lastRequestParams = { ...this.requestParams };
      });
    }
  };
