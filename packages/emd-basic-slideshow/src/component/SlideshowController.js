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

    childrenUpdatedCallback () {
      this.slideCount = this.children.length;
    }

    render () {
      return this.currentView.use(this);
    }
  };
