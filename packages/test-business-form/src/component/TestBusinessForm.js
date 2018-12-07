import { TestBusinessFormView } from './TestBusinessFormView.js';
import * as validations from './validations.js';

export const TestBusinessForm = Base => class extends Base {
  constructor() {
    super();
    this.addFriend = this.addFriend.bind(this);
    this.removeFriend = this.removeFriend.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.handleFormSubmitSucess = this.handleFormSubmitSucess.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.formElement = this.shadowRoot.querySelector('sling-form');
  }

  static get properties() {
    return {
      form: {
        type: Object,
        reflectToAttribute: false,
      },
    };
  }

  handleFormUpdate(evt) {
    this.form = evt.detail;
  }

  handleFormSubmitSucess(evt) {
    console.log(this, evt.detail);
  }

  addFriend() {
    this.formElement.values = {
      ...this.formElement.values,
      friends: [
        ...this.formElement.values.friends || [],
        { name: '' },
      ],
    };

    this.formElement.errors = {
      ...this.formElement.errors,
      friends: [
        ...this.formElement.errors.friends || [],
        { name: null },
      ],
    };

    this.formElement.touched = {
      ...this.formElement.touched,
      friends: [
        ...this.formElement.touched.friends || [],
        { name: false },
      ],
    };
  }

  removeFriend(index) {
    return () => {
      this.formElement.values = {
        ...this.formElement.values,
        friends: this.formElement.values
          .friends.filter((_, idx) => idx !== index),
      };

      this.formElement.errors = {
        ...this.formElement.errors,
        friends: this.formElement.errors
          .friends.filter((_, idx) => idx !== index),
      };

      this.formElement.touched = {
        ...this.formElement.touched,
        friends: this.formElement.touched
          .friends.filter((_, idx) => idx !== index),
      };
    };
  }

  render() {
    const {
      form,
      handleFormUpdate,
      handleFormSubmitSucess,
      addFriend,
      removeFriend,
    } = this;

    return TestBusinessFormView({
      ...form,
      ...validations,
      handleFormUpdate,
      handleFormSubmitSucess,
      addFriend,
      removeFriend,
    });
  }
};
