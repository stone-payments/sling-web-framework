import { registerComponent } from 'sling-helpers';
import { Menu } from './Menu';

registerComponent('sling-menu', Menu);

let $menu;

describe('Menu', () => {
  beforeEach(() => {
    $menu = document.createElement('sling-menu');
    document.body.appendChild($menu);
  });

  afterEach(() => {
    document.body.removeChild($menu);
    $menu = undefined;
  });

  describe('Reflection', () => {
    it('Should reflect "layout" attribute to property ', () => {
      $menu.setAttribute('layout', 'horizontal');
      expect($menu.layout).to.equal('horizontal');
    });

    it('Should reflect "layout" property to attribute ', (done) => {
      $menu.layout = 'horizontal';

      setTimeout(() => {
        expect($menu.getAttribute('layout')).to.equal('horizontal');
        done();
      });
    });

    it('Should reflect "size" attribute to property ', () => {
      $menu.setAttribute('size', 'small');
      expect($menu.size).to.equal('small');
    });

    it('Should reflect "size" property to attribute ', (done) => {
      $menu.size = 'small';

      setTimeout(() => {
        expect($menu.getAttribute('size')).to.equal('small');
        done();
      });
    });
  });
});
