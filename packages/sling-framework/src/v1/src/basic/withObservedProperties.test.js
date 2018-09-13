import sinon from 'sinon';
import { LitElement } from '@polymer/lit-element';
import { withObservedProperties } from './withObservedProperties.js';
import { domHelper } from '../../../../node_modules/sling-helpers/src/index.js';

describe('withObservedProperties', () => {
  class ObservedPropLitElement extends withObservedProperties(LitElement) {
    constructor() {
      super();
      this.watched = 0;
      this.seen = 0;
    }

    static get properties() {
      return {
        watched: {
          type: Number,
          observer: 'observedMethod',
        },
        seen: {
          type: Number,
          observer(newValue, oldValue) {
            this.observedMethod(newValue, oldValue);
          },
        },
      };
    }

    _render() {}
  }

  domHelper.registerComponent('observed-prop-lit', ObservedPropLitElement);

  let $dummy;

  beforeEach(() => {
    $dummy = document.createElement('observed-prop-lit');
    $dummy.observedMethod = sinon.spy();
    document.body.appendChild($dummy);
  });

  afterEach(() => {
    document.body.removeChild($dummy);
    $dummy = null;
  });

  it('Should not break without a base class.', () => {
    class ObsPropBaseless extends withObservedProperties() {
      _render() {}
    }

    domHelper.registerComponent('observed-prop-baseless', ObsPropBaseless);
    const $baseless = document.createElement('observed-prop-baseless');
    document.body.appendChild($baseless);
    expect($baseless.constructor === ObsPropBaseless).to.be.true;
    document.body.removeChild($baseless);
  });

  it('Should run a method declared as a string when a ' +
    'property changes.', (done) => {
    $dummy.watched = 15;

    setTimeout(() => {
      expect($dummy.observedMethod.calledWith(15, 0));
      done();
    });
  });

  it('Should run a method declared as a function when a ' +
    'property changes.', (done) => {
    $dummy.seen = 12;

    setTimeout(() => {
      expect($dummy.observedMethod.calledWith(12, 0));
      done();
    });
  });
});
