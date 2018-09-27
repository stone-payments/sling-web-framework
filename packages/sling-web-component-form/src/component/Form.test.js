import { registerComponent } from 'sling-helpers';
import { Form } from './Form.js';

registerComponent('sling-form', Form);

let formElement;

let inputWithName;

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

  it('All elements inside a Form shoud have a name or an id', () => {
    expect(formElement.formdata).not.to.equal(null);
  });

  it('Form should render elements whitout errors', () => {
    expect(() => {
      inputWithName = document.createElement('input');
      inputWithName.type = 'text';
      inputWithName.name = 'anyName';

      formElement.appendChild(inputWithName);
    }).to.not.throw();
  });
});
