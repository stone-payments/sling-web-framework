import { registerComponent } from 'sling-helpers';
import { LoaderWrapper } from './LoaderWrapper';

registerComponent('sling-loader-wrapper', LoaderWrapper);

let $loaderWrapper;

describe('Loader Wrapper', () => {
  beforeEach(() => {
    $loaderWrapper = document.createElement('sling-loader-wrapper');
    document.body.appendChild($loaderWrapper);
  });

  afterEach(() => {
    document.body.removeChild($loaderWrapper);
    $loaderWrapper = undefined;
  });

  it('Should reflect "loading" attribute to property ', () => {
    $loaderWrapper.setAttribute('loading', '');

    expect($loaderWrapper.loading).to.be.true;
  });

  it('Should reflect "loading" property to attribute ', (done) => {
    $loaderWrapper.loading = false;

    setTimeout(() => {
      expect($loaderWrapper.hasAttribute('loading')).to.be.false;
      done();
    });
  });
});
