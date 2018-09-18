export const withAttributeToCss = (Base = HTMLElement) =>
  class extends Base {
    constructor() {
      super();
      this._attrToMod = this._attrToMod.bind(this);
    }

    _attrToMod(base, attrName) {
      const attrValue = this[attrName];

      if (attrValue == null || attrValue === false) {
        return '';
      }

      const modValue = (attrValue !== true)
        ? `_${attrValue}`
        : '';

      return `${base}_${attrName}${modValue}`;
    }

    generateClassName(base, attrNames) {
      return [
        base,
        ...attrNames.map(attrName => this._attrToMod(base, attrName)),
      ]
        .filter(item => item)
        .join(' ');
    }
  };
