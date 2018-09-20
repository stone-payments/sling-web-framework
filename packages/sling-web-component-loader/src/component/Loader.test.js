/* eslint-disable */
import { registerComponent } from 'sling-helpers';
import { Loader } from './Loader.js';

registerComponent('sling-loader', Loader);

let $loader

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

    expect($loader.loading).to.equal(true)
  })

  it('Should reflect "loading" property to attribute ', () => {
    setTimeout(() => {
      $loader.loading = false;

      expect($loader.getAttribute('loading')).to.equal(false)
    }, 1000)
  })
});
