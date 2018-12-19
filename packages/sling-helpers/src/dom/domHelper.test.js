import {
  waitUntilEvent,
  waitUntilTagIsAppended,
  registerComponent,
  setAttr,
} from './domHelper.js';

describe('waitUntilEvent', () => {
  it('1. Should resolve to undefined if an event is dispatched by ' +
    'the document.', (done) => {
    const testEvent = new CustomEvent('doctestevent');

    waitUntilEvent('doctestevent').then((result) => {
      expect(result).to.equal(undefined);
      done();
    });

    document.dispatchEvent(testEvent);
  });

  it('2. Should enable changing the event emmiter.', (done) => {
    const testEvent = new CustomEvent('divtestevent');
    const $div = document.createElement('div');
    document.body.appendChild($div);

    waitUntilEvent('divtestevent', $div).then((result) => {
      expect(result).to.equal(undefined);
      document.body.removeChild($div);
      done();
    });

    $div.dispatchEvent(testEvent);
  });
});

describe('waitUntilTagIsAppended', () => {
  it('Should resolve to a child tag after it is ' +
    'appended to another tag.', (done) => {
    const $parent = document.createElement('test-component');
    const $child = document.createElement('div');
    const $unseen = document.createElement('ol');
    document.body.appendChild($parent);

    waitUntilTagIsAppended('div', $parent).then(($appended) => {
      expect($appended.tagName.toLowerCase()).to.equal('div');
      document.body.removeChild($parent);
      done();
    });

    $parent.appendChild($unseen);
    $parent.appendChild($child);
  });
});

describe('registerComponent', () => {
  it('Should register a web component if it is not registered.', () => {
    class testComponent {}
    registerComponent('test-component', testComponent);
    expect(window.customElements.get('test-component')).to.equal(testComponent);
  });
});

describe('setAttr', () => {
  it('Should set attributes into an element.', () => {
    const $div = document.createElement('div');
    setAttr($div, 'testName', 'testValue');
    expect($div.getAttribute('testName')).to.equal('testValue');
  });
});
