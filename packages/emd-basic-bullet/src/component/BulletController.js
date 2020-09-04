export const BulletController = (Base = class {}) =>
  class extends Base {
    render () {
      return this.currentView.use(this);
    }
  };
