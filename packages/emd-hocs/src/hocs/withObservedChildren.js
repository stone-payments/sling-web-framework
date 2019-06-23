export const withObservedChildren = (Base = class {}) =>
  class extends Base {
    static childrenObserverController (callback) {
      return new MutationObserver(callback);
    }

    static get childrenObserverOptions () {
      return {
        childList: true,
        subtree: true
      };
    }

    connectedCallback () {
      if (super.connectedCallback) {
        super.connectedCallback();
      }

      if (this.childrenUpdatedCallback) {
        const callback = this.childrenUpdatedCallback.bind(this);

        this._childrenObserver = this.constructor
          .childrenObserverController(callback);

        this._childrenObserver.observe(this,
          this.constructor.childrenObserverOptions);

        callback();
      }
    }

    disconnectedCallback () {
      if (super.disconnectedCallback) {
        super.disconnectedCallback();
      }

      if (this._childrenObserver) {
        this._childrenObserver.disconnect();
      }
    }
  };
