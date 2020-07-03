export const SlideshowController = (Base = class {}) =>
  class extends Base {
    static get properties () {
      return {
        current: {
          type: Number,
          reflect: true
        },
        delay: {
          type: Number,
          reflect: true
        },
        slideCount: {
          type: Number,
          reflect: false
        }
      };
    }

    get current () {
      return this._current;
    }

    set current (value) {
      const oldValue = this._current;
      const nextValue = this.parseCurrent(value) || oldValue;
      this._current = nextValue;
      this.setAttribute('current', nextValue);
      this.requestUpdate('current', oldValue);
      this.updateSlides();
    }

    parseCurrent (current) {
      const parsed = Number(current);

      if (Number.isNaN(parsed)) {
        return undefined;
      }

      const rounded = Math.round(parsed);

      if (rounded < 1) {
        return 1;
      }

      return (rounded > this.slideCount)
        ? this.slideCount
        : rounded;
    }

    attributeChangedCallback (attrName, pastValue, nextValue) {
      super.attributeChangedCallback(attrName, pastValue, nextValue);
      if (attrName === 'delay') {
        this.style.setProperty('--emd-slideshow-delay', `${nextValue}ms`);
      }
    }

    childrenUpdatedCallback () {
      this.slideCount = this.children.length;
      this.updateSlides();
    }

    updateSlides () {
      const parsedCurrent = this.current || 1;

      Array.from(this.children).forEach((slide, index) => {
        const slideNumber = index + 1;

        slide.removeAttribute('before');
        slide.removeAttribute('current');
        slide.removeAttribute('after');

        if (slideNumber < parsedCurrent) {
          slide.setAttribute('before', '');
        } else if (slideNumber > parsedCurrent) {
          slide.setAttribute('after', '');
        } else {
          slide.setAttribute('current', '');
        }
      });
    }

    render () {
      return this.currentView.use(this);
    }
  };
