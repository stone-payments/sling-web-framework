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
        }
      };
    }

    get target () {
      return this.for && this.parentNode && this.parentNode.children
        ? Array.from(this.parentNode.children).find(el => el.id === this.for)
        : undefined;
    }

    attributeChangedCallback (...attrs) {
      super.attributeChangedCallback(...attrs);
      this.bindTooltipAndTarget();
    }

    connectedCallback () {
      super.connectedCallback();
      this.bindTooltipAndTarget();
    }

    disconnectedCallback () {
      super.disconnectedCallback();
      this.unbindTooltipAndTarget();
    }

    unbindTooltipAndTarget () {
      this.removeAttribute('style');

      if (this.target) {
        this.target.removeEventListener('mouseover', this.handleMouseOver);
        this.target.removeEventListener('mouseout', this.handleMouseOut);
      }
    }

    bindTooltipAndTarget () {
      this.unbindTooltipAndTarget();

      if (this.target) {
        this.target.addEventListener('mouseover', this.handleMouseOver);
        this.target.addEventListener('mouseout', this.handleMouseOver);
        window.requestAnimationFrame(this.updateTooltipPosition);
      }
    }

    updateTooltipPosition () {
      const {
        top,
        bottom,
        left,
        right,
        width,
        height
      } = this.target.getBoundingClientRect();

      const position = this.position || 'right';

      switch (position) {
        case 'top':
          this.style.top = `${top}px`;
          this.style.left = `${left}px`;
          this.style.width = `${width}px`;
          break;

        case 'bottom':
          this.style.top = `${bottom}px`;
          this.style.left = `${left}px`;
          this.style.width = `${width}px`;
          break;

        case 'left':
          this.style.top = `${top}px`;
          this.style.left = `${left}px`;
          this.style.height = `${height}px`;
          break;

        case 'right':
          this.style.top = `${top}px`;
          this.style.left = `${right}px`;
          this.style.height = `${height}px`;
          break;
      }

      this.style.position = 'fixed';
      this.style.margin = 'auto';
      this.style.border = '1px solid #909';

      if (this.target) {
        window.requestAnimationFrame(this.updateTooltipPosition);
      }
    }

    handleMouseOver (evt) {
      console.log(evt);
    }

    handleMouseOut (evt) {
      console.log(evt);
    }

    render () {
      return this.currentView.use(this);
    }
  };
