export const LoadingWrapperController = (Base = class {}) =>
  class extends Base {
    constructor () {
      super();
      this.handleLoadingStart = this.handleLoadingStart.bind(this);
      this.handleLoadingEnd = this.handleLoadingEnd.bind(this);
      this._animateSpinnerPosition = this._animateSpinnerPosition.bind(this);
    }

    static get properties () {
      return {
        loading: {
          type: Boolean,
          reflect: true
        },
        screenaware: {
          type: Boolean,
          reflect: true
        },
        minloadingheight: {
          type: Number,
          reflect: true
        }
      };
    }

    get parent () {
      return this.renderRoot.querySelector('.loading-wrapper');
    }

    get child () {
      return this.renderRoot.querySelector('.loading-wrapper__loader');
    }

    get screenaware () {
      return this._screenaware;
    }

    set screenaware (value) {
      const oldScreenaware = this._screenaware;

      if (value === true) {
        this._forceCenterSpinner();
      } else {
        this._stopForceCenteringSpinner();
      }

      this._screenaware = value;
      this.requestUpdate('screenaware', oldScreenaware);
    }

    disconnectedCallback () {
      this._stopForceCenteringSpinner();
    }

    _applySpinnerPosition () {
      if (this.parent && this.child) {
        const {
          top: parentTop,
          bottom: parentBottom
        } = this.parent.getBoundingClientRect();

        const parentHeight = this.parent.clientHeight;

        const minHeight = this.minloadingheight || 64;

        this.child.style.top = Math.min(
          Math.max(0, parentTop * -1), parentHeight - minHeight) + 'px';

        this.child.style.height = Math.max(minHeight,
          (Math.min(window.innerHeight, parentBottom) -
            Math.max(0, parentTop))) + 'px';
      }
    }

    _animateSpinnerPosition () {
      this._applySpinnerPosition();

      this._animation =
        window.requestAnimationFrame(this._animateSpinnerPosition);
    }

    _forceCenterSpinner () {
      this._animateSpinnerPosition();
    }

    _stopForceCenteringSpinner () {
      if (this._animation) {
        window.cancelAnimationFrame(this._animation);
      }

      if (this.child) {
        this.child.style = '';
      }
    }

    handleLoadingStart () {
      this.loading = true;
    }

    handleLoadingEnd () {
      this.loading = false;
    }

    render () {
      return this.currentView.use(this);
    }
  };
