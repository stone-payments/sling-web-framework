import { registerComponent } from 'sling-helpers';
import { MenuItem } from './MenuItem';

registerComponent('sling-menu-item', MenuItem);
let $menuItem;

describe('MenuItem', () => {
  beforeEach(() => {
    $menuItem = document.createElement('sling-menu-item');
    $menuItem.setAttribute('href', 'http://test.com');
    document.body.appendChild($menuItem);
  });

  afterEach(() => {
    document.body.removeChild($menuItem);
    $menuItem = undefined;
  });

  describe('Reflection', () => {
    it('Should reflect "aim" attribute to property ', () => {
      $menuItem.setAttribute('aim', 'info');
      expect($menuItem.aim).to.equal('info');
    });

    it('Should reflect "aim" property to attribute ', (done) => {
      $menuItem.aim = 'info';
      setTimeout(() => {
        expect($menuItem.getAttribute('aim')).to.equal('info');
        done();
      });
    });

    it('Should reflect "href" attribute to property ', () => {
      $menuItem.setAttribute('href', 'http://google.com');
      expect($menuItem.href).to.equal('http://google.com');
    });

    it('Should reflect "href" property to attribute ', (done) => {
      $menuItem.href = 'http://test.com';
      setTimeout(() => {
        expect($menuItem.getAttribute('href')).to.equal('http://test.com');
        done();
      });
    });

    it('Should fail when "href" attribute is not set', () => {
      const menuItemFail = document.createElement('sling-menu-item');
      document.body.appendChild(menuItemFail);
      expect.fai(menuItemFail.href);
    });

    it('Should reflect "active" attribute to property ', () => {
      $menuItem.setAttribute('active', 'true');
      expect($menuItem.active).to.equal('true');
    });

    it('Should reflect "active" property to attribute ', (done) => {
      $menuItem.active = 'active';

      setTimeout(() => {
        expect($menuItem.getAttribute('active')).to.equal('active');
        done();
      });
    });
  });
});
