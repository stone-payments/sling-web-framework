import { registerComponent } from 'sling-helpers';
import { Form } from './Form.js';

registerComponent('sling-form', Form);

let formElement;

describe('Form', () => {
  beforeEach(() => {
    formElement = document.createElement('sling-form');
    document.body.appendChild(formElement);
  });

  afterEach(() => {
    if (formElement != null) {
      document.body.removeChild(formElement);
      formElement = undefined;
    }
  });

  it('Should create the element', () => {
    expect(formElement).not.to.equal(undefined);
  });
});
