export const BrandIconController = (Base = class {}) => class extends Base {
  static getIconByName (name) {
    const key = name.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/-/g, '_')
      .replace(' ', '_')
      .toUpperCase();
    return this.icons[key] || '';
  }

  static get properties () {
    return {
      icon: {
        type: String,
        reflect: true
      },
      nofallback: {
        type: Boolean,
        reflect: true
      }
    };
  }

  get iconSvg () {
    return this.constructor.getIconByName(this.icon);
  }

  get stoneIcon () {
    return this.constructor.icons.STONE;
  }

  get isUnknownIcon () {
    return this.nofallback && this.iconSvg === '';
  }
};
