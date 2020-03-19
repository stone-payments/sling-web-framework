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
        this._interval = window.requestAnimationFrame(() => {
          const {
            top,
            left,
            width,
            height
          } = this.target.getBoundingClientRect();

          this.style.top = `${top}px`;
          this.style.left = `${left}px`;
          this.style.width = `${width}px`;
          this.style.height = `${height}px`;
          this.style.position = 'fixed';
          this.style.margin = 'auto';
        });
      } else {
        window.cancelAnimationFrame(this._interval);
        this.removeAttribute('style');
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
