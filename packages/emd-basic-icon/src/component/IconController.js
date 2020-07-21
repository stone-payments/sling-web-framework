export const IconController = (Base = class {}) => class extends Base {
  static getIconByName (name) {
    const key = name.toUpperCase().replace(/-/g, '_');
    return this.icons[key] || '';
  }

  static get properties () {
    return {
      icon: {
        type: String,
        reflect: true
      }
    };
  }

  get iconSvg () {
    return this.constructor.getIconByName(this.icon);
  }

  render () {
    return this.currentView.apply(this);
  }
};
