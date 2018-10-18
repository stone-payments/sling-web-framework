import { registerComponent } from 'sling-helpers';
import { Tooltip } from './Tooltip.js';

registerComponent('sling-tooltip', Tooltip);

let $tooltip;

describe('Tooltip', () => {
  beforeEach(() => {
    $tooltip = document.createElement('sling-tooltip');
    document.body.appendChild($tooltip);
  });

  afterEach(() => {
    document.body.removeChild($tooltip);
    $tooltip = undefined;
  });

  it('Should reflect attributes to properties', () => {
    $tooltip.setAttribute('position', 'right');
    $tooltip.setAttribute('tooltiptext', 'test');

    expect($tooltip.position).eq('right');
    expect($tooltip.tooltiptext).eq('test');
  });

  it('Should reflect properties to attributes ', (done) => {
    $tooltip.position = 'right';
    $tooltip.tooltiptext = 'test';

    setTimeout(() => {
      expect($tooltip.getAttribute('position')).to.equal('right');
      expect($tooltip.getAttribute('tooltiptext')).to.equal('test');
      done();
    });
  });
});
