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

    attributeChangedCallback (attrName, pastValue, nextValue) {
      super.attributeChangedCallback(attrName, pastValue, nextValue);

      if (pastValue !== nextValue) {
        if (attrName === 'delay') {
          this.style.setProperty('--emd-slideshow-delay', `${nextValue}ms`);
        }
      }
    }

    childrenUpdatedCallback () {
      this.slideCount = this.children.length;
    }

    render () {
      return this.currentView.use(this);
    }
  };
