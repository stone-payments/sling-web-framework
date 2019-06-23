export const FieldWrapperController = (Base = class {}) =>
  class extends Base {
    static get properties () {
      return {
        label: {
          type: String,
          reflect: true
        },
        hint: {
          type: String,
          reflect: true
        },
        emptyhint: {
          type: Boolean,
          reflect: true
        },
        message: {
          type: String,
          reflect: true
        },
        name: {
          type: String,
          reflect: false
        }
      };
    }

    get wrapped () {
      return Array.from(this.children).find(element => !element.slot);
    }

    static getFieldId (field) {
      return field.getAttribute('name') ||
        field.name ||
        field.getAttribute('id') ||
        field.id;
    }

    static get childrenObserverOptions () {
      return {
        attributes: true,
        attributeFilter: ['name', 'id'],
        childList: false,
        subtree: true
      };
    }

    childrenUpdatedCallback () {
      if (this.wrapped) {
        this.name = this.constructor.getFieldId(this.wrapped);
      }
    }

    render () {
      return this.currentView.apply(this);
    }
  };
