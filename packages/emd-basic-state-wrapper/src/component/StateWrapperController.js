import { isDeeplyEmpty, isFunction } from '@stone-payments/emd-helpers';
import { stateNames } from '../constants/stateNames.js';
import { eventNames } from '../constants/eventNames.js';

export const StateWrapperController = (Base = class {}) =>
  class extends Base {
    constructor () {
      super();

      this._handleLoadingStart = this._handleLoadingStart.bind(this);
      this._handleLoadingEnd = this._handleLoadingEnd.bind(this);
      this._handleSourceChange = this._handleSourceChange.bind(this);
      this._handleRequestError = this._handleRequestError.bind(this);

      this.currentState = stateNames.PRISTINE;
    }

    static get properties () {
      return {
        states: {
          type: Array,
          reflect: false
        },
        currentState: {
          type: String,
          reflect: false
        },
        isLoading: {
          type: Boolean,
          reflect: false
        },
        view: {
          type: String,
          reflect: true
        },
        recovery: {
          type: Function,
          reflect: false
        }
      };
    }

    get states () {
      return this.constructor.states;
    }

    get wrapped () {
      return Array.from(this.children).find(element => !element.slot);
    }

    get currentSlide () {
      return this.renderRoot.querySelector('.emd-state-wrapper__state_current');
    }

    get currentState () {
      return this._currentState;
    }

    set currentState (value) {
      const pastValue = this.currentState;
      this._currentState = value;
      this.requestUpdate('currentState', pastValue);

      this.updateComplete.then(() => {
        if (this.currentSlide.scrollTop !== 0) {
          this.currentSlide.scrollTop = 0;
        }
      });
    }

    _actOnListeners (method) {
      [
        [eventNames.LOADING_START, this._handleLoadingStart],
        [eventNames.LOADING_END, this._handleLoadingEnd],
        [eventNames.SOURCE_CHANGE, this._handleSourceChange],
        [eventNames.REQUEST_ERROR, this._handleRequestError]
      ].forEach(([eventName, callback]) => {
        if (this.wrapped && isFunction(this.wrapped[method])) {
          this.wrapped[method](eventName, callback);
        }
      });
    }

    _addListeners () {
      this._actOnListeners('addEventListener');
    }

    _removeListeners () {
      this._actOnListeners('removeEventListener');
    }

    childrenUpdatedCallback () {
      this._removeListeners();
      this._addListeners();
    }

    disconnectedCallback () {
      if (super.disconnectedCallback) {
        super.disconnectedCallback();
      }

      this._removeListeners();
    }

    _handleLoadingStart () {
      this.isLoading = true;
    }

    _handleLoadingEnd () {
      this.isLoading = false;
    }

    async _handleSourceChange ({ detail: source }) {
      const { PRISTINE, EMPTY, DEFAULT } = stateNames;

      if (isDeeplyEmpty(source)) {
        if (!this._sourceHasChangedBefore) {
          this.currentState = PRISTINE;
          this._sourceHasChangedBefore = true;
        } else {
          this.currentState = EMPTY;
        }
      } else {
        this.currentState = DEFAULT;
      }
    }

    _handleRequestError ({ detail: err }) {
      const { ERROR, RECOVERY } = stateNames;

      if (err.status === 401) {
        this.currentState = ERROR;
      } else {
        this.currentState = RECOVERY;
      }
    }

    render () {
      return this.currentView.apply(this);
    }
  };
