import { isFunction, setAttr } from '@stone-payments/emd-helpers';

export const withViews = (Base = class {}) => class extends Base {
  constructor () {
    super();

    // Make sure that setting the view property to undefined
    // will trigger the attribute removal on LitElement
    // despite its default behaviour.

    if (isFunction(this.requestUpdate)) {
      Object.defineProperty(this, 'view', {
        get () {
          return this._view;
        },
        set (value) {
          const pastValue = this._view;
          this._view = value;

          if (this._view == null) {
            this.removeAttribute('view');
          }

          this.requestUpdate('view', pastValue);
        }
      });
    }
  }

  static processViews (views) {
    if (isFunction(views)) {
      return [{
        name: 'default',
        apply: views,
        isDefault: true
      }];
    }

    return views;
  }

  static get views () {
    return this._views;
  }

  static set views (value) {
    this._views = this.processViews(value);
  }

  get view () {
    return this.getAttribute('view');
  }

  set view (value) {
    setAttr(this, 'view', value);
  }

  get currentView () {
    let currentView;

    currentView = this.constructor.views.find(view => view.name === this.view);

    return (currentView != null)
      ? currentView
      : this.constructor.views.find(view => view.isDefault);
  }
};
