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
        }
      };
    }

    get current () {
      return this._current == null
        ? Number(this.slideCount != null && this.slideCount > 0)
        : this._current;
    }

    set current (value) {
      const oldValue = this.current;
      const parsedValue = this._parseUserDefinedCurrent(value);
      const nextValue = parsedValue != null ? parsedValue : oldValue;

      this._current = nextValue;

      this.setAttribute('current', nextValue);
      this.requestUpdate('current', oldValue);
      this._updateSlides();
    }

    _parseUserDefinedCurrent (current) {
      const parsed = Number(current);

      if (Number.isNaN(parsed)) {
        return undefined;
      }

      const rounded = Math.round(parsed);

      if (rounded < 1 && this.slideCount > 0) {
        return 1;
      }

      return (rounded > this.slideCount)
        ? this.slideCount
        : Math.max(0, rounded);
    }

    attributeChangedCallback (attrName, pastValue, nextValue) {
      super.attributeChangedCallback(attrName, pastValue, nextValue);
      if (attrName === 'delay') {
        this.style.setProperty('--emd-slideshow-delay', `${nextValue}ms`);
      }
    }

    childrenUpdatedCallback () {
      this.slideCount = this.children.length;
      this._updateSlides();
    }

    _updateSlides () {
      Array.from(this.children).forEach((slide, index) => {
        const slideNumber = index + 1;

        slide.removeAttribute('before');
        slide.removeAttribute('current');
        slide.removeAttribute('after');

        if (slideNumber < this.current) {
          slide.setAttribute('before', '');
        } else if (slideNumber > this.current) {
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
