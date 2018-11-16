import { TestBusinessFormView } from './TestBusinessFormView.js';

const validateUserName = value => (value === 'admin'
  ? 'Please do not use admin!'
  : undefined);

export const TestBusinessForm = Base => class extends Base {
  render() {
    const { formdata } = this.shadowRoot.querySelector('sling-form');

    console.log(formdata);

    return TestBusinessFormView({
      ...formdata,
      validateUserName,
    });
  }
};
