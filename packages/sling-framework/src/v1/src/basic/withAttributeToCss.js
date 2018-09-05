export const withAttributeToCss = (Base = HTMLElement) =>
  class extends Base {
    static attrToMod(base, attrName, attrValue) {
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
        ...attrNames.map(attrName =>
          this.constructor.attrToMod(base, attrName, this[attrName])),
      ]
        .filter(item => item)
        .join(' ');
    }
  };
