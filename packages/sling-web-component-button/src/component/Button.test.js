import { registerComponent } from 'sling-helpers';
import { Button } from './Button.js';

registerComponent('sling-button', Button);

let $button;

describe('Button', () => {
  beforeEach(() => {
    $button = document.createElement('sling-button');
    document.body.appendChild($button);
  });

  afterEach(() => {
    document.body.removeChild($button);
    $button = undefined;
  });

  it('Should reflect "layout" attribute to property.', (done) => {
    $button.setAttribute('layout', 'alert');

    setTimeout(() => {
      expect($button.layout).to.equal('alert');
      done();
    });
  });

  it('Should reflect "layout" property to attribute.', (done) => {
    $button.layout = 'alert';

    setTimeout(() => {
      expect($button.getAttribute('layout')).to.equal('alert');
      done();
    });
  });

  it('Should remove "layout" attribute if property is null.', (done) => {
    $button.layout = null;

    setTimeout(() => {
      expect($button.hasAttribute('layout')).to.equal(false);
      done();
    });
  });
});
