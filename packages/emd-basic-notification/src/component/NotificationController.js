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

    actionSlot () {
      return this.renderRoot
        ? this.renderRoot.querySelector('slot[name=action]')
        : undefined;
    }

    childrenUpdatedCallback () {
      const filledSlots = Array.from(this.children).map(item => item.slot);
      this.hasAction = filledSlots.includes('action');
    }

    render () {
      return this.currentView.use(this);
    }
  };
