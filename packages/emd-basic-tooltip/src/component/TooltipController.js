export const TooltipController = (Base = class {}) =>
  class extends Base {
    static get properties () {
      return {
        view: {
          type: String,
          reflect: true
        },
        position: {
          type: String,
          reflect: true
        },
        text: {
          type: String,
          reflect: true
        },
        for: {
          type: String,
          reflect: true
        }
      };
    }

    get for () {
      return this._for;
    }

    set for (value) {
      const oldValue = this._for;
      this._for = value;

      if (this.target) {
        console.log(this.target);
      } else {
        console.log('removed target');
      }

      this.requestUpdate('for', oldValue);
    }

    get target () {
      return this.for && this.parentNode && this.parentNode.children
        ? Array.from(this.parentNode.children).find(el => el.id === this.for)
        : undefined;
    }

    render () {
      return this.currentView.use(this);
    }
  };
