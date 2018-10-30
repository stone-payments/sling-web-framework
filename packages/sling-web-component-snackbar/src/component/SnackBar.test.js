import { spy } from 'sinon';
import { registerComponent } from 'sling-helpers';
import { SnackBar } from './SnackBar.js';

registerComponent('sling-snackbar', SnackBar);

let $snackbar;

describe('Snackbar', () => {
  beforeEach(() => {
    $snackbar = document.createElement('sling-snackbar');
    document.body.appendChild($snackbar);
  });

  afterEach(() => {
    document.body.removeChild($snackbar);
    $snackbar = undefined;
  });

  describe('Reflection', () => {
    it('Should reflect "layout" attribute to property ', () => {
      $snackbar.setAttribute('layout', 'outline');
      expect($snackbar.layout).to.equal('outline');
    });

    it('Should reflect "layout" property to attribute ', (done) => {
      $snackbar.layout = 'outline';

      setTimeout(() => {
        expect($snackbar.getAttribute('layout')).to.equal('outline');
        done();
      });
    });

    it('Should reflect "aim" attribute to property ', () => {
      $snackbar.setAttribute('aim', 'danger');
      expect($snackbar.aim).to.equal('danger');
    });

    it('Should reflect "aim" property to attribute ', (done) => {
      $snackbar.aim = 'warning';

      setTimeout(() => {
        expect($snackbar.getAttribute('aim')).to.equal('warning');
        done();
      });
    });

    it('Should reflect "size" attribute to property ', () => {
      $snackbar.setAttribute('size', 'small');
      expect($snackbar.size).to.equal('small');
    });

    it('Should reflect "size" property to attribute ', (done) => {
      $snackbar.size = 'big';

      setTimeout(() => {
        expect($snackbar.getAttribute('size')).to.equal('big');
        done();
      });
    });

    it('Should reflect "closeable" attribute to property ', () => {
      $snackbar.setAttribute('closeable', '');
      expect($snackbar.closeable).to.be.true;
    });

    it('Should reflect "closeable" property to attribute ', (done) => {
      $snackbar.closeable = null;

      setTimeout(() => {
        expect($snackbar.getAttribute('closeable')).to.be.null;
        done();
      });
    });
  });

  describe('Content rendering', () => {
    it('Should use "info" icon if "aim" attribute is omitted', () => {
      const $icon = $snackbar.shadowRoot.querySelector('sling-icon');
      expect($icon.icon).to.equal('info');
    });

    it('Should reflect to icon when "aim" is provided', (done) => {
      $snackbar.aim = 'danger';

      setTimeout(() => {
        const $icon = $snackbar.shadowRoot.querySelector('sling-icon');
        expect($icon.icon).to.equal('danger');
        done();
      });
    });

    it('Should NOT render a close button when "closeable" is omitted', () => {
      expect($snackbar.shadowRoot.querySelector('sling-button')).to.not.exist;
    });

    it('Should render a close button when "closeable" is provided', (done) => {
      $snackbar.closeable = true;

      setTimeout(() => {
        expect($snackbar.shadowRoot.querySelector('sling-button')).to.exist;
        done();
      });
    });
  });

  describe('Handlers', () => {
    it('Should call "closeclick" handler when close '
      + 'button is clicked', (done) => {
      $snackbar.closeable = true;

      setTimeout(() => {
        const handler = spy();
        $snackbar.addEventListener('closeclick', handler);
        $snackbar.shadowRoot.querySelector('sling-button').click();

        expect(handler.calledOnce).to.be.true;
        done();
      });
    });
  });
});
