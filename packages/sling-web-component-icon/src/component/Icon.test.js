import { registerComponent } from 'sling-helpers';
import { Icon } from './Icon.js';

registerComponent('sling-icon', Icon);

let $icon;

describe('Brand Icon', () => {
  beforeEach(() => {
    $icon = document.createElement('sling-icon');
    document.body.appendChild($icon);
  });

  afterEach(() => {
    document.body.removeChild($icon);
    $icon = undefined;
  });

  it('Should reflect "icon" attribute to property ', () => {
    $icon.setAttribute('icon', 'danger');

    expect($icon.icon).to.equal('danger');
  });

  it('Should reflect "icon" property to attribute ', () => {
    $icon.icon = 'info';

    expect($icon.getAttribute('icon')).to.equal('info');
  });
});
