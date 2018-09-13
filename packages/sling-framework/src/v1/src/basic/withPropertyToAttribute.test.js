import { LitElement } from '@polymer/lit-element';
import { withPropertyToAttribute } from './withPropertyToAttribute.js';
import { domHelper } from '../../../../node_modules/sling-helpers/src/index.js';

describe('withPropertyToAttribute', () => {
  class PropAttrLitElement extends withPropertyToAttribute(LitElement) {
    static get properties() {
      return {
        reflected: {
          type: String,
          reflectToAttribute: true,
        },
        opaque: {
          type: String,
          reflectToAttribute: false,
        },
        bool: {
          type: Boolean,
          reflectToAttribute: true,
        },
      };
    }

    render() {}
  }

  domHelper.registerComponent('prop-attr-lit', PropAttrLitElement);

  let $dummy;

  beforeEach(() => {
    $dummy = document.createElement('prop-attr-lit');
    document.body.appendChild($dummy);
  });

  afterEach(() => {
    document.body.removeChild($dummy);
    $dummy = null;
  });

  it('Should not break without a base class.', () => {
    class PropAttrBaseless extends withPropertyToAttribute() {
      render() {}
    }

    domHelper.registerComponent('prop-attr-baseless', PropAttrBaseless);
    const $baseless = document.createElement('prop-attr-baseless');
    document.body.appendChild($baseless);
    expect($baseless.constructor === PropAttrBaseless).to.be.true;
    document.body.removeChild($baseless);
  });

  it('Should reflect attribute to property when "reflectToAttribute" ' +
    'is true.', (done) => {
    $dummy.setAttribute('reflected', 'mirror');

    setTimeout(() => {
      expect($dummy.reflected).to.equal('mirror');
      done();
    });
  });

  it('Should reflect property to attribute when "reflectToAttribute" ' +
    'is true.', (done) => {
    $dummy.reflected = 'lake';

    setTimeout(() => {
      expect($dummy.getAttribute('reflected')).to.equal('lake');
      done();
    });
  });

  it('Should not reflect property to attribute when "reflectToAttribute" ' +
    'is false.', (done) => {
    $dummy.removeAttribute('opaque');
    $dummy.opaque = 'lake';

    setTimeout(() => {
      expect($dummy.getAttribute('opaque')).to.equal(null);
      done();
    });
  });

  it('Should reflect boolean property true to attribute ' +
    'when "reflectToAttribute" is true.', (done) => {
    $dummy.removeAttribute('bool');
    $dummy.bool = true;

    setTimeout(() => {
      expect($dummy.getAttribute('bool')).to.equal('');
      done();
    });
  });

  it('Should reflect boolean property false to attribute ' +
    'when "reflectToAttribute" is true.', (done) => {
    $dummy.setAttribute('bool', '');
    $dummy.bool = false;

    setTimeout(() => {
      expect($dummy.hasAttribute('bool')).to.equal(false);
      done();
    });
  });

  it('Should remove attribute when property is null ' +
    'and "reflectToAttribute" is true.', (done) => {
    $dummy.setAttribute('bool', '');
    $dummy.bool = null;

    setTimeout(() => {
      expect($dummy.hasAttribute('bool')).to.equal(false);
      done();
    });
  });

  it('Should remove attribute when property is undefined ' +
    'and "reflectToAttribute" is true.', (done) => {
    $dummy.setAttribute('bool', '');
    $dummy.bool = undefined;

    setTimeout(() => {
      expect($dummy.hasAttribute('bool')).to.equal(false);
      done();
    });
  });
});
