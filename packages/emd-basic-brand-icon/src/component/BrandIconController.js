export const BrandIconController = (Base = class {}) => class extends Base {
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

  static getPossibleKeys (str) {
    if (str == null || str === '') {
      return [];
    }

    const parsedStr = str
      .normalize('NFD')
      .replace(/([\u0300-\u036f]|\.)/g, '')
      .replace(/-| /g, '_')
      .toUpperCase();

    return parsedStr
      .split('_')
      .reduceRight((result, item, index, arr) => {
        const firstPossibleKey = arr.slice(0, index + 1).join('_');
        const secondPossibleKey = firstPossibleKey.replace(/_/g, '');
        return index !== 0
          ? [...result, firstPossibleKey, secondPossibleKey]
          : [...result, firstPossibleKey];
      }, []);
  }

  static getIconKey (name) {
    return this.getPossibleKeys(name).find(key => this.icons[key] != null);
  }

  static getIconView (name) {
    return this.icons[this.getIconKey(name)];
  }

  get iconKey () {
    return this.constructor.getIconKey(this.icon);
  }

  get iconView () {
    return this.constructor.getIconView(this.icon);
  }

  get stoneIconView () {
    return this.constructor.icons.STONE;
  }

  get isRenderable () {
    return Boolean(this.iconView || !this.nofallback);
  }

  render () {
    return this.currentView.apply(this);
  }
};
