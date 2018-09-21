import { registerComponent } from 'sling-helpers';
import { Input } from './Input.js';

registerComponent('sling-input', Input);

let inputElement;

describe('Input', () => {
  beforeEach(() => {
    inputElement = document.createElement('sling-input');
    document.body.appendChild(inputElement);
  });

  afterEach(() => {
    if (inputElement != null) {
      document.body.removeChild(inputElement);
      inputElement = undefined;
    }
  });

  it('Should create the element', () => {
    expect(inputElement).not.to.equal(undefined);
  });
});
