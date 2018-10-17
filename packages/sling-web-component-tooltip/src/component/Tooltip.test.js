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

  it('Should reflect "position", "tooltiptext", ' +
  'attribute to property ', () => {
    $tooltip.setAttribute('position', 'right');
    $tooltip.setAttribute('tooltiptext', 'test');

    expect($tooltip.position).eq('right');
    expect($tooltip.tooltiptext).eq('test');
  });
});
