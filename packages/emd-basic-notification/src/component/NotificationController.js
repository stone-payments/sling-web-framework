export const NotificationController = (Base = class {}) =>
  class extends Base {
    static get properties () {
      return {
        view: {
          type: String,
          reflect: true
        },
        mode: {
          type: String,
          reflect: true
        },
        hasAction: {
          type: Boolean,
          reflect: false
        }
      };
    }

    childrenUpdatedCallback () {
      const filledSlots = Array.from(this.children).map(item => item.slot);
      this.hasAction = filledSlots.includes('action');
    }

    render () {
      return this.currentView.use(this);
    }
  };
