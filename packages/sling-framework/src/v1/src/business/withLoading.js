export const withLoading = (Base = HTMLElement) =>
  class extends Base {
    static get properties() {
      return {
        loading: {
          type: Boolean,
          reflectToAttribute: false,
        },
      };
    }

    constructor() {
      super();
      this.loading = 0;
    }

    get isLoading() {
      return this.loading > 0;
    }

    requestSingle(request) {
      this.loading += 1;

      return request
        .then((result) => {
          this.loading -= 1;
          return result;
        })
        .catch((err) => {
          this.loading -= 1;
          throw err;
        });
    }

    request(oneOrManyRequests) {
      const requestSingle = this.requestSingle.bind(this);

      if (Array.isArray(oneOrManyRequests)) {
        const errors = [];

        const addErrorLogger = promise => promise.catch((err) => {
          errors.push(err);
          return undefined;
        });

        return Promise
          .all(oneOrManyRequests.map(addErrorLogger).map(requestSingle))
          .then((payloads) => {
            if (errors.length > 0) {
              throw errors[0];
            }
            return payloads;
          });
      }

      return requestSingle(oneOrManyRequests);
    }
  };
