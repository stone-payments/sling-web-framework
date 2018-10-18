import { registerComponent } from 'sling-helpers';
import { Label } from './Label.js';

registerComponent('sling-label', Label);

let $label;

describe('Label', () => {
  beforeEach(() => {
    $label = document.createElement('sling-label');
    document.body.appendChild($label);
  });

  afterEach(() => {
    document.body.removeChild($label);
    $label = undefined;
  });

  it('Should reflect attributes to properties ', () => {
    $label.setAttribute('type', 'outline');
    $label.setAttribute('color', 'purple');
    $label.setAttribute('size', 'big');
    $label.setAttribute('imageName', 'success');
    $label.setAttribute('showBullet', true);

    expect($label.type).to.equal('outline');
    expect($label.color).to.equal('purple');
    expect($label.size).to.equal('big');
    expect($label.imageName).to.equal('success');
    expect($label.showBullet).to.be.true;
  });

  it('Should reflect properties to attributes ', (done) => {
    $label.type = 'outline';
    $label.color = 'purple';
    $label.size = 'big';
    $label.imageName = 'success';
    $label.showBullet = true;

    setTimeout(() => {
      expect($label.getAttribute('type')).to.equal('outline');
      expect($label.getAttribute('color')).to.equal('purple');
      expect($label.getAttribute('size')).to.equal('big');
      expect($label.getAttribute('imageName')).to.equal('success');
      expect($label.showBullet).to.be.true;
      done();
    });
  });
});
