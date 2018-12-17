import { registerComponent } from 'sling-helpers';
import { MenuItem } from './MenuItem';

registerComponent('sling-menu-item', MenuItem);
let $menuItem;
let $menu;

describe('MenuItem', () => {
  beforeEach(() => {
    $menu = document.createElement('sling-menu');
    document.body.appendChild($menu);

    $menuItem = document.createElement('sling-menu-item');
    $menuItem.setAttribute('href', 'http://test.com');
    $menu.appendChild($menuItem);
  });

  afterEach(() => {
    $menu.removeChild($menuItem);
    $menuItem = undefined;
  });

  describe('Reflection', () => {
    it('Should reflect "icon" attribute to property', () => {
      $menuItem.setAttribute('icon', 'info');
      expect($menuItem.icon).to.equal('info');
    });

    it('Should reflect "icon" property to attribute', (done) => {
      $menuItem.icon = 'info';
      setTimeout(() => {
        expect($menuItem.getAttribute('icon')).to.equal('info');
        done();
      });
    });

    it('Should reflect "href" attribute to property', () => {
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
      expect.toThrow();
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
