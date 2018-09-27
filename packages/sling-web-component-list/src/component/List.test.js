import { registerComponent } from 'sling-helpers';
import { List } from './List.js';

registerComponent('sling-list', List);

let $List;

describe('List', () => {
  beforeEach(() => {
    $List = document.createElement('sling-list');
    document.body.appendChild($List);
  });

  afterEach(() => {
    if ($List != null) {
      document.body.removeChild($List);
      $List = undefined;
    }
  });

  it('Should reflect "cascadelist" to attribute to property', () => {
    $List.setAttribute('cascadelist', '');

    expect($List.cascadelist).to.be.true;
  });

  it('Should reflect "cascadelist" to attribute to property', () => {
    $List.cascadelist = false;

    expect($List.cascadelist).to.be.false;
  });
});
