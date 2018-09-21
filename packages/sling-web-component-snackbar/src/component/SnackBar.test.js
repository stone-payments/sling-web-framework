/* eslint-disable */
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

  it('Should reflect "brandid", "width" and "heigth" attribute to property ', () => {
    $snackbar.setAttribute('layout', 'outline');
    $snackbar.setAttribute('aim', 'danger');
    $snackbar.setAttribute('size', 'small');
    $snackbar.setAttribute('closeable', '');

    expect($snackbar.layout).to.equal('outline')
    expect($snackbar.aim).to.equal('danger')
    expect($snackbar.size).to.equal('small')
    expect($snackbar.closeable).to.be.true
  })

  it('Should reflect "layout", "aim" and "heigth" property to attribute ', (done) => {
    $snackbar.layout = 'outline';
    $snackbar.aim = 'warning';
    $snackbar.size = 'big';
    $snackbar.closeable = null;

    setTimeout(() => {
      expect($snackbar.getAttribute('layout')).to.equal('outline')
      expect($snackbar.getAttribute('aim')).to.equal('warning')
      expect($snackbar.getAttribute('size')).to.equal('big')
      expect($snackbar.getAttribute('closeable')).to.be.null
      done()
    })
  })

});