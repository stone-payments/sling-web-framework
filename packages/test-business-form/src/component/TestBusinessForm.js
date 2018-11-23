import { TestBusinessFormView } from './TestBusinessFormView.js';
import * as validations from './validations.js';

export const TestBusinessForm = Base => class extends Base {
  constructor() {
    super();
    this.friends = [];
    this.currentFriend = 0;

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
      friends: {
        type: Array,
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
    this.currentFriend += 1;
    this.friends = [...this.friends, this.currentFriend];
  }

  removeFriend(id) {
    this.friends = this.friends.filter(friend => friend !== id);
  }

  render() {
    const {
      form,
      friends,
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
      friends,
      addFriend,
      removeFriend,
    });
  }
};
