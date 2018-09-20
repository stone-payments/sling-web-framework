import { registerComponent } from 'sling-helpers';
import { Loader } from './Loader.js';

registerComponent('sling-loader', Loader);

let $loader;

describe('Loader', () => {
  beforeEach(() => {
    $loader = document.createElement('sling-loader');
    document.body.appendChild($loader);
  });

  afterEach(() => {
    document.body.removeChild($loader);
    $loader = undefined;
  });

  it('Should reflect "loading" attribute to property ', () => {
    $loader.setAttribute('loading', '');

    expect($loader.hasAttribute('loading')).to.be.true;
  })

  it('Should reflect "loading" property to attribute ', (done) => {
    $loader.loading = false;

    setTimeout(() => {
      expect($loader.hasAttribute('loading')).to.be.false;
      done();
    });
  });
});
