export const withLoadingAndErrorHandling = (Base = class {}) =>
  class extends Base {
    constructor() {
      super();
      this.loading = 0;
      this.isLoading = false;
      this.requestErrors = [];
    }

    requestSingle(request) {
      this.startLoading();

      return request
        .then((result) => {
          this.dispatchEventAndMethod('requestsuccess');
          this.finishLoading();
          return result;
        })
        .catch((err) => {
          this.requestErrors = [...this.requestErrors, err];
          this.dispatchEventAndMethod('requesterror', { unhandledError: err });
          this.finishLoading();
        });
    }

    startLoading() {
      if (this.loading === 0) {
        this.dispatchEventAndMethod('startloading');
      }

      this.loading += 1;
      this.isLoading = this.loading > 0;
    }

    finishLoading() {
      this.loading -= 1;
      this.isLoading = this.loading > 0;

      if (this.loading === 0) {
        this.dispatchEventAndMethod('finishloading');
      }
    }

    request(oneOrManyRequests) {
      const requestSingle = this.requestSingle.bind(this);

      if (Array.isArray(oneOrManyRequests)) {
        return Promise.all(oneOrManyRequests.map(requestSingle));
      }

      return requestSingle(oneOrManyRequests);
    }
  };
