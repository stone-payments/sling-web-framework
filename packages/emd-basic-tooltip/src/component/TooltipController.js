export const TooltipController = (Base = class {}) =>
  class extends Base {
    constructor () {
      super();
      this.updateTooltipPosition = this.updateTooltipPosition.bind(this);
      this.handleMouseOver = this.handleMouseOver.bind(this);
      this.handleMouseOut = this.handleMouseOut.bind(this);
    }

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
        },
        targetActive: {
          type: Boolean,
          reflect: false
        }
      };
    }

    attributeChangedCallback (attrName, pastValue, nextValue) {
      super.attributeChangedCallback(attrName, pastValue, nextValue);

      if (attrName === 'for') {
        this.unbindTooltipAndTarget();

        const targetAttempt = this.parentNode && this.parentNode.children
          ? Array.from(this.parentNode.children).find(el => el.id === nextValue)
          : undefined;

        this.target = targetAttempt;
        this.bindTooltipAndTarget();
      }
    }

    connectedCallback () {
      super.connectedCallback();
    }

    disconnectedCallback () {
      super.disconnectedCallback();
      this.unbindTooltipAndTarget();
    }

    unbindTooltipAndTarget () {
      if (this.target) {
        this.target.removeEventListener('mouseover', this.handleMouseOver);
        this.target.removeEventListener('mouseout', this.handleMouseOut);
      }
    }

    bindTooltipAndTarget () {
      if (this.target) {
        this.target.addEventListener('mouseover', this.handleMouseOver);
        this.target.addEventListener('mouseout', this.handleMouseOut);
      }

      this.updateTooltipPosition();
    }

    updateTooltipPosition () {
      if (this.target) {
        const {
          top,
          bottom,
          left,
          right,
          width,
          height
        } = this.target.getBoundingClientRect();

        switch (this.position) {
          case 'top':
            this.style.top = `${top}px`;
            this.style.left = `${left}px`;
            this.style.width = `${width}px`;
            this.style.height = 'auto';
            break;

          case 'bottom':
            this.style.top = `${bottom}px`;
            this.style.left = `${left}px`;
            this.style.width = `${width}px`;
            this.style.height = 'auto';
            break;

          case 'left':
            this.style.top = `${top}px`;
            this.style.left = `${left}px`;
            this.style.width = 'auto';
            this.style.height = `${height}px`;
            break;

          default:
            this.style.top = `${top}px`;
            this.style.left = `${right}px`;
            this.style.width = 'auto';
            this.style.height = `${height}px`;
            break;
        }

        this.style.position = 'fixed';
        this.style.margin = 'auto';
        this.style.zIndex = '99999';

        window.requestAnimationFrame(this.updateTooltipPosition);
      } else {
        this.removeAttribute('style');
      }
    }

    handleMouseOver () {
      this.targetActive = true;
    }

    handleMouseOut () {
      this.targetActive = false;
    }

    render () {
      return this.currentView.use(this);
    }
  };
