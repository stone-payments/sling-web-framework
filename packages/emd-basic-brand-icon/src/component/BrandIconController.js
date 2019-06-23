export const BrandIconController = (Base = class {}) => class extends Base {
  static getIconByName (name) {
    const key = name.toUpperCase().replace(/-'/g, '_');
    return this.icons[key] || this.icons.STONE;
  }
};
