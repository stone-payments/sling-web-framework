import { withEventDispatch } from './withEventDispatch.js';

export const withLoadingAndErrorHandling = (Base = class {}) =>
  class extends withEventDispatch(Base) {
    constructor () {
      super();
      this.isLoading = false;
      this.requestErrors = [];

      this._loading = 0;
      this._requestSingle = this._requestSingle.bind(this);
    }

    request (oneOrManyRequests) {
      this.requestErrors = [];

      if (Array.isArray(oneOrManyRequests)) {
        return Promise.all(oneOrManyRequests.map(this._requestSingle));
      }

      return this._requestSingle(oneOrManyRequests);
    }

    _requestSingle (request) {
      this._startLoading();

      return request
        .then((response) => {
          this.dispatchEventAndMethod('requestsuccess', response);
          this._finishLoading();
          return response;
        })
        .catch((err) => {
          this.requestErrors = [...this.requestErrors, err];
          this.dispatchEventAndMethod('requesterror', err);
          this._finishLoading();
          return err;
        });
    }

    _startLoading () {
      if (this._loading === 0) {
        this.dispatchEventAndMethod('loadingstart');
      }

      this._loading += 1;
      this.isLoading = this._loading > 0;
    }

    _finishLoading () {
      this._loading -= 1;
      this.isLoading = this._loading > 0;

      if (this._loading === 0) {
        this.dispatchEventAndMethod('loadingend');
      }
    }
  };
