/* eslint-disable */
import { registerComponent } from 'sling-helpers';
import { BrandIcon } from './BrandIcon.js';

registerComponent('sling-brand-icon', BrandIcon);

let $brandIcon;

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

    expect($brandIcon.brandid).to.equal(2);
    expect($brandIcon.width).to.equal('50');
    expect($brandIcon.height).to.equal('50')
  });

  it('Should reflect "brandid", "width" and "heigth" property to attribute ', () => {
    $brandIcon.brandid = 3;
    $brandIcon.width = 50;
    $brandIcon.height = 50;

    expect($brandIcon.getAttribute('brandid')).to.equal('3');
    expect($brandIcon.getAttribute('width')).to.equal('50');
    expect($brandIcon.getAttribute('height')).to.equal('50');
  });

  it('Should not set "brandid", "width" and "heigth" property and remove ' +
    'the respective attribute', () => {
    $brandIcon.brandid = false;
    $brandIcon.width = false;
    $brandIcon.height = false;

    expect($brandIcon.getAttribute('brandid')).to.equal(null);
    expect($brandIcon.getAttribute('width')).to.equal(null);
    expect($brandIcon.getAttribute('height')).to.equal(null)
  });

  it('Should get the correct svg based on the id', () => {
    // Visa
    $brandIcon.brandid = 1;
    expect($brandIcon.getSvg().includes('visa')).to.equal(true);
    // Mastercard
    $brandIcon.brandid = 2;
    expect($brandIcon.getSvg().includes('mastercard')).to.equal(true);
    // American Express
    $brandIcon.brandid = 3;
    expect($brandIcon.getSvg().includes('amex')).to.equal(true);
    // Ticket
    $brandIcon.brandid = 5;
    expect($brandIcon.getSvg().includes('ticket')).to.equal(true);
    // Sodexo
    $brandIcon.brandid = 6;
    expect($brandIcon.getSvg().includes('sodexo')).to.equal(true);
    // VR
    $brandIcon.brandid = 7;
    expect($brandIcon.getSvg().includes('vr')).to.equal(true);
    // Alelo
    $brandIcon.brandid = 8;
    expect($brandIcon.getSvg().includes('alelo')).to.equal(true);
    // Hipercard
    $brandIcon.brandid = 9;
    expect($brandIcon.getSvg().includes('hiper')).to.equal(true);
    // Page-1 (?)
    $brandIcon.brandid = 12;
    expect($brandIcon.getSvg().includes('Page-1')).to.equal(true);
    // Elo
    $brandIcon.brandid = 171;
    expect($brandIcon.getSvg().includes('elo')).to.equal(true);
  });

  describe('parseUnit', () => {
    it('Should return the value with `px` when theres no `px` or `%`', () => {
      expect(BrandIcon.parseUnit('50')).to.equal('50px');
    });

    it('Should return the value when the value contains ' +
      '`%` or `px` sign', () => {
      expect(BrandIcon.parseUnit('50px')).to.equal('50px');
      expect(BrandIcon.parseUnit('50%')).to.equal('50%');
    });
  })
});

