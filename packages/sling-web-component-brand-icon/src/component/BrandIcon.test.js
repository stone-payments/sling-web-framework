/* eslint-disable */
import { domHelper } from 'sling-helpers';
import { BrandIcon } from './BrandIcon.js';

domHelper.registerComponent('sling-brand-icon', BrandIcon);

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

  it('Should reflect "brandid" attribute to property ', () => {
    $brandIcon.setAttribute('brandid', '2');
    setTimeout(() => {
      expect($brandIcon.brandid).to.equal(2)
    })
  })

  it('Should reflect "width" attribute to property ', () => {
    $brandIcon.setAttribute('width', '50');
    setTimeout(() => {
      expect($brandIcon.width).to.equal(50)
    })
  })

  it('Should reflect "height" attribute to property ', () => {
    $brandIcon.setAttribute('height', '50');
    setTimeout(() => {
      expect($brandIcon.height).to.equal(50)
    })
  })

  it('Should reflect "brandid" property to attribute ', () => {
    $brandIcon.brandid = 3;

    setTimeout(() => {
      expect($brandIcon.getAttribute('brandid')).to.equal('3')
    })
  })

  it('Should reflect "width" property to attribute ', () => {
    $brandIcon.width = 50;

    setTimeout(() => {
      expect($brandIcon.getAttribute('width')).to.equal('50')
    })
  })

  it('Should reflect "height" property to attribute ', () => {
    $brandIcon.height = 50;

    setTimeout(() => {
      expect($brandIcon.getAttribute('height')).to.equal('50')
    })
  })
});

