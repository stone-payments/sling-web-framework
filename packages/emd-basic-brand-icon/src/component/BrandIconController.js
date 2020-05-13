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

  static getIconId (name) {
    const possibleKeys = this.getPossibleKeys(name);

    for (const possibleKey of possibleKeys) {
      if (this.icons[possibleKey]) {
        return possibleKey;
      }
    }

    return undefined;
  }

  static getIconView (name) {
    return this.icons[this.getIconId(name)];
  }

  get iconId () {
    return this.constructor.getIconId(this.icon);
  }

  get iconView () {
    return this.constructor.getIconView(this.icon);
  }

  get stoneIconView () {
    return this.constructor.icons.STONE;
  }

  get isUnknownIcon () {
    return this.nofallback && !this.iconView;
  }

  render () {
    return this.currentView.apply(this);
  }
};
