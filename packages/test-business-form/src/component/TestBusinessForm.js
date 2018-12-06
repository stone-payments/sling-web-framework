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
    this.form.values = {
      ...this.form.values,
      friends: [
        ...this.form.values.friends || [],
        { name: '' },
      ],
    };
  }

  removeFriend(index) {
    return () => {
      this.form.values = {
        ...this.form.values,
        friends: this.form.values.friends.filter((_, idx) => idx !== index),
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
