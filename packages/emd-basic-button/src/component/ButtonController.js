export const ButtonController = (Base = class {}) =>
  class extends Base {
    constructor () {
      super();
      this.type = 'button';
    }

    static get properties () {
      return {
        abc: {
          type: Boolean,
          reflect: true
        },
        size: {
          type: String,
          reflect: true
        },
        rank: {
          type: String,
          reflect: true
        },
        type: {
          type: String,
          reflect: true
        },
        disabled: {
          type: Boolean,
          reflect: true
        },
        loading: {
          type: Boolean,
          reflect: true
        },
        href: {
          type: String,
          reflect: true
        },
        target: {
          type: String,
          reflect: true
        },
        multipleclicks: {
          type: Boolean,
          reflect: true
        },
        hasText: {
          type: Boolean,
          reflect: false
        },
        hasIcon: {
          type: Boolean,
          reflect: false
        }
      };
    }

    static get childrenObserverOptions () {
      return {
        characterData: true,
        childList: true,
        subtree: true
      };
    }

    childrenUpdatedCallback () {
      this.hasIcon = Array.from(this.children).some(n => n.slot === 'icon');
      this.hasText = this.textContent.trim() !== '';
    }

    handleClick (evt) {
      const clickCount = evt.detail || 1;

      if (this.disabled || this.loading ||
        (!this.multipleclicks && clickCount > 1)) {
        evt.stopPropagation();
      }
    }

    render () {
      return this.currentView.apply(this);
    }
  };
