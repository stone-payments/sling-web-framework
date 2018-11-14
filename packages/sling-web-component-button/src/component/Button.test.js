import sinon from 'sinon';
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

  describe('Has "disabled" attribute', () => {
    beforeEach(() => {
      $button.disabled = true;
    });

    afterEach(() => {
      $button.disabled = false;
    });

    it('Should not call "click" event handler when inner content ' +
    'is clicked.', (done) => {
      const $innerContent = document.createElement('span');
      const clickSpy = sinon.spy();

      $button.appendChild($innerContent);
      $button.addEventListener('click', clickSpy);
      $innerContent.click();

      setTimeout(() => {
        expect(clickSpy.called).to.equal(false);
        done();
      });
    });
  });
});
