export const addType = (type, validateFn, maskFn) =>
  Base => class extends Base {
    attributeChangedCallback(attrName, previousValue, nextValue) {
      super.attributeChangedCallback(attrName, previousValue, nextValue);

      if (attrName === 'type' && nextValue === type) {
        this.updateDefaultValidationAndMask(validateFn, maskFn);
      }
    }
  };
