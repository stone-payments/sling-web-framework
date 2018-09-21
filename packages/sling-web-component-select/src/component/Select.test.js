import sinon from 'sinon';
import { registerComponent } from 'sling-helpers';
import { Select } from '../component/Select.js';

registerComponent('sling-select', Select);

let $select;

describe('Select', () => {
  beforeEach(() => {
    $select = document.createElement('sling-select');
    $select.srcoptions = [{ name: 'test1', id: 1 }, { name: 'test2', id: 2 }];
    document.body.appendChild($select);
  });

  afterEach(() => {
    document.body.removeChild($select);
    $select = undefined;
  });

  it('Should capture the change event', () => {
    $select.dispatchEventAndMethod = sinon.spy();
    const mock = { target: { value: 2 } };
    $select.handleChange(mock);

    expect($select.value).to.equal(2);
    expect($select.dispatchEventAndMethod.calledWith('change', $select.value));
  });

  it('Should render element whitout srcoptions.', () => {
    document.body.removeChild($select);
    $select = document.createElement('sling-select');
    $select.srcoptions = undefined;
    document.body.appendChild($select);

    expect($select.value).to.equal(undefined);
  });
});
