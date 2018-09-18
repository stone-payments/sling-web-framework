import { registerComponent } from 'sling-helpers';
import { LitElement } from '../../../lib/lit-element.bundle.js';
import { withEventDispatch } from './withEventDispatch.js';

describe('withEventDispatch', () => {
  class EvtDispatchLitElement extends withEventDispatch(LitElement) {
    render() {}
  }

  if (window.customElements.get('evt-dispatch-lit') == null) {
    window.customElements.define('evt-dispatch-lit', EvtDispatchLitElement);
  }

  let $dummy;

  beforeEach(() => {
    $dummy = document.createElement('evt-dispatch-lit');
    document.body.appendChild($dummy);
  });

  afterEach(() => {
    document.body.removeChild($dummy);
    $dummy = null;
  });

  it('Should not break without a base class.', () => {
    class EvtDispatchBaseless extends withEventDispatch() {}

    registerComponent('evt-dispatch-baseless', EvtDispatchBaseless);
    const $baseless = document.createElement('evt-dispatch-baseless');
    document.body.appendChild($baseless);
    expect($baseless.constructor === EvtDispatchBaseless).to.be.true;
    document.body.removeChild($baseless);
  });

  it('Should dispatch a custom event.', (done) => {
    const handleEvent = (evt) => {
      expect(evt.type).to.equal('paginate');
      $dummy.removeEventListener('paginate', handleEvent);
      done();
    };

    $dummy.addEventListener('paginate', handleEvent);
    $dummy.dispatchEventAndMethod('paginate');
  });

  it('Should dispatch a custom event that bubbles.', (done) => {
    const handleEvent = (evt) => {
      expect(evt.type).to.equal('paginate');
      window.removeEventListener('paginate', handleEvent);
      done();
    };

    window.addEventListener('paginate', handleEvent);
    $dummy.dispatchEventAndMethod('paginate');
  });

  it('Should dispatch a custom event with detail.', (done) => {
    const handleEvent = (evt) => {
      expect(evt.detail.current).to.equal(2);
      $dummy.removeEventListener('paginate', handleEvent);
      done();
    };

    $dummy.addEventListener('paginate', handleEvent);
    $dummy.dispatchEventAndMethod('paginate', { current: 2 });
  });

  it('Should call a method named on{event} if it is defined ' +
    'as a property.', (done) => {
    $dummy.onpaginate = (evt) => {
      expect(evt.type).to.equal('paginate');
      done();
    };

    $dummy.dispatchEventAndMethod('paginate');
  });

  it('Should not throw an error if on{event} is not defined.', () => {
    expect(() => $dummy.dispatchEventAndMethod('imaginary')).not.to.throw();
  });

  it('Should dispatch the same event.', (done) => {
    const handleEvent = (evt) => {
      expect(evt.type).to.equal('customEvt');
      $dummy.removeEventListener('customEvt', handleEvent);
      done();
    };

    const customEvt = new CustomEvent('customEvt', { bubbles: true });

    document.addEventListener('customEvt', handleEvent);
    $dummy.bubbleEvent(customEvt);
  });
});
