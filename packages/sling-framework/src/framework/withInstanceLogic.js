export const withInstanceLogic = (Base = HTMLElement) =>
  class extends Base {
    constructor() {
      super();
      this.instance = {
        id: this.localName,
      };
    }
  };
