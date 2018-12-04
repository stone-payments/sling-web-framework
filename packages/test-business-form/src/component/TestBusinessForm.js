import { TestBusinessFormView } from './TestBusinessFormView.js';
import * as validations from './validations.js';

export const TestBusinessForm = Base => class extends Base {
  constructor() {
    super();
    this.addFriend = this.addFriend.bind(this);
    this.removeFriend = this.removeFriend.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
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

  handleFormSubmission() {
    this.form.submitForm()
      .then((values) => {
        console.log('valid', values);
      })
      .catch((errors) => {
        console.log('invalid', errors);
      })
      .then(this.form.finishSubmission);
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
      handleFormSubmission,
      addFriend,
      removeFriend,
    } = this;

    return TestBusinessFormView({
      ...form,
      ...validations,
      handleFormUpdate,
      handleFormSubmission,
      addFriend,
      removeFriend,
    });
  }
};
