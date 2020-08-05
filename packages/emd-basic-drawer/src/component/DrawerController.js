import { delay } from '@stone-payments/emd-helpers';

export const DrawerController = (Base = class {}) => class extends Base {
  constructor () {
    super();
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  static calcutaleRect (domEl) {
    const computed = getComputedStyle(domEl);

    const width = domEl.offsetWidth +
      parseInt(computed.getPropertyValue('margin-left')) +
      parseInt(computed.getPropertyValue('margin-right'));

    const height = domEl.offsetHeight +
      parseInt(computed.getPropertyValue('margin-top')) +
      parseInt(computed.getPropertyValue('margin-bottom'));

    return { width, height };
  }

  static get properties () {
    return {
      open: {
        type: Boolean,
        reflect: true
      },
      direction: {
        type: String,
        reflect: true
      },
      delay: {
        type: Number,
        reflect: true
      },
      effect: {
        type: String,
        reflect: true
      }
    };
  }

  async connectedCallback () {
    if (super.connectedCallback) {
      super.connectedCallback();
    }

    await this.updateComplete;
    this.applyStyle('');

    this.shadowRoot.addEventListener('transitionend',
      this.handleTransitionEnd);
  }

  disconnectedCallback () {
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }

    this.shadowRoot.removeEventListener('transitionend',
      this.handleTransitionEnd);
  }

  get wrapper () {
    return this.shadowRoot.querySelector('.emd-drawer__wrapper');
  }

  get styledProp () {
    return (this.direction === 'vertical')
      ? 'height'
      : 'width';
  }

  updated (changedProperties) {
    changedProperties.forEach((pastValue, propName) => {
      if (propName === 'open') {
        const eventName = this.open ? 'openstart' : 'closestart';
        this.dispatchEventAndMethod(eventName);
        this.handleOpen();
      }
    });
  }

  applyStyle (style) {
    this.wrapper.style[this.styledProp] = style;
  }

  async handleOpen () {
    if (this.style.display !== 'none') {
      const rect = this.constructor.calcutaleRect(this.firstElementChild);
      this.applyStyle(`${rect[this.styledProp]}px`);
    } else {
      const eventName = this.open ? 'openend' : 'closeend';
      this.dispatchEventAndMethod(eventName);
    }

    if (!this.open) {
      this.wrapper.classList.remove('emd-drawer__wrapper_open');
      await delay(50);
      this.applyStyle('');
    } else {
      this.wrapper.classList.add('emd-drawer__wrapper_open');
    }
  }

  handleTransitionEnd () {
    const eventName = this.open ? 'openend' : 'closeend';
    this.dispatchEventAndMethod(eventName);
    this.applyStyle('');
  }

  render () {
    return this.currentView.apply(this);
  }
};
