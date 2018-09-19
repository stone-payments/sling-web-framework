/* eslint-disable */
import { registerComponent } from 'sling-helpers';
import { BrandIcon } from './BrandIcon.js';

registerComponent('sling-brand-icon', BrandIcon);

let $brandIcon

describe('Brand Icon', () => {
  beforeEach(() => {
    $brandIcon = document.createElement('sling-brand-icon');
    document.body.appendChild($brandIcon);
  });

  afterEach(() => {
    document.body.removeChild($brandIcon);
    $brandIcon = undefined;
  });

  it('Should reflect "brandid", "width" and "heigth" attribute to property ', () => {
    $brandIcon.setAttribute('brandid', '2');
    $brandIcon.setAttribute('width', 50);
    $brandIcon.setAttribute('height', 50);

    expect($brandIcon.brandid).to.equal(2)
    expect($brandIcon.width).to.equal('50')
    expect($brandIcon.height).to.equal('50')
  })

  it('Should reflect "brandid", "width" and "heigth" property to attribute ', () => {
    $brandIcon.brandid = 3;
    $brandIcon.width = 50;
    $brandIcon.height = 50;

    expect($brandIcon.getAttribute('brandid')).to.equal('3')
    expect($brandIcon.getAttribute('width')).to.equal('50')
    expect($brandIcon.getAttribute('height')).to.equal('50')
  })
});

