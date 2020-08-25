export const ButtonController = (Base = class {}) =>
  class extends Base {
    constructor () {
      super();
      this.type = 'button';
      this.handleClick = this.handleClick.bind(this);
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
        showIcon: {
          type: Boolean,
          reflect: false
        }
      };
    }

    childrenUpdatedCallback () {
      const filledSlots = Array
        .from(this.children)
        .map(item => item.slot || '');

      const isFilled = slotName => filledSlots.includes(slotName);
      this.showIcon = isFilled('icon');
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
