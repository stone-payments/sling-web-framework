import { LitElement } from '@polymer/lit-element';
import { withAttributeToCss } from './withAttributeToCss.js';
import { domHelper } from '../../../../node_modules/sling-helpers/src/index.js';

describe('withAttributeToCss', () => {
  class AttrCssLitElement extends withAttributeToCss(LitElement) {
    static get properties() {
      return {
        reflected: {
          type: String,
          reflectToAttribute: true,
        },
        bool: {
          type: Boolean,
          reflectToAttribute: true,
        },
      };
    }

    _render() {}
  }

  domHelper.registerComponent('attr-css-lit', AttrCssLitElement);

  let $dummy;

  beforeEach(() => {
    $dummy = document.createElement('attr-css-lit');
    document.body.appendChild($dummy);
  });

  afterEach(() => {
    document.body.removeChild($dummy);
    $dummy = null;
  });

  it('Should not break without a base class.', () => {
    class AttrCssBaseless extends withAttributeToCss() {}

    domHelper.registerComponent('attr-css-baseless', AttrCssBaseless);
    const $baseless = document.createElement('attr-css-baseless');
    document.body.appendChild($baseless);
    expect($baseless.constructor === AttrCssBaseless).to.be.true;
    document.body.removeChild($baseless);
  });

  it('Should have a public method called "generateClassName".', () => {
    expect(typeof $dummy.generateClassName).to.equal('function');
  });

  it('Should generate a .block_modifier_value className when passed ' +
    'an attribute name which value is a string.', () => {
    $dummy.setAttribute('reflected', 'mirror');

    expect($dummy.generateClassName('btn', ['reflected']))
      .to.equal('btn btn_reflected_mirror');
  });

  it('Should generate a .block_modifier className when passed ' +
    'an attribute name which value is an empty string.', () => {
    $dummy.setAttribute('bool', '');

    expect($dummy.generateClassName('btn', ['bool']))
      .to.equal('btn btn_bool');
  });

  it('Should not generate a .block className when passed ' +
    'an attribute name which value is null.', () => {
    $dummy.removeAttribute('bool');

    expect($dummy.generateClassName('btn', ['bool']))
      .to.equal('btn');
  });

  it('Should not generate a .block className when passed ' +
    'the name of an attribute that does not exist.', () => {
    expect($dummy.generateClassName('btn', ['laser']))
      .to.equal('btn');
  });
});
