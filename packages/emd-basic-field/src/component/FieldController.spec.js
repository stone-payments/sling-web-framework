import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
const { expect } = chai;

const win = global.window;
let FieldController;
let Controller;
let element;

const HTMLElement = class {};
HTMLElement.prototype.connectedCallback = sinon.spy();
HTMLElement.prototype.attachShadow = sinon.spy();
HTMLElement.prototype.querySelector = sinon.spy();
HTMLElement.prototype.shadowRoot = new HTMLElement();

describe('FieldController', () => {
  beforeEach(async () => {
    global.window = {};
    ({ FieldController } = await import('./FieldController.js'));
    Controller = FieldController(HTMLElement);

    element = new Controller();
    element.dispatchEventAndMethod = sinon.spy();
    element._handleFieldValidation = sinon.spy();

    Object.defineProperty(element, '_processedFieldValue', {
      get () { return this.__processedFieldValue; },
      set (value) { this.__processedFieldValue = value; }
    });
  });

  afterEach(() => {
    global.window = win;
    Controller = undefined;
    element = undefined;
  });

  describe('#connectedCallback()', () => {
    it('Should upgrade properties before calling super', () => {
      element._upgradeProperty = sinon.spy();
      element.connectedCallback();

      expect(element._upgradeProperty).to.have.been.calledOnceWith('value');
      expect(HTMLElement.prototype.connectedCallback).to.have.been.calledOnce;
      expect(HTMLElement.prototype.connectedCallback)
        .to.have.been.calledAfter(element._upgradeProperty);
    });
  });

  describe('#field', () => {
    it('Should get the input DOM element', () => {
      const FAKE_DOM_INPUT = {};

      element.renderRoot = {
        querySelector: sinon.stub().withArgs('input').returns(FAKE_DOM_INPUT)
      };

      expect(element.field).to.equal(FAKE_DOM_INPUT);
    });
  });

  describe('#value', () => {
    beforeEach(() => {
      Object.defineProperty(element, 'field', {
        get () { return this._field; },
        set (value) { this._field = value; }
      });
    });

    it('Should get the processed value', () => {
      element._processedFieldValue = 'laser';
      expect(element.value).to.equal('laser');
    });

    it('Should set the initial value if the dom field is not available', () => {
      element.field = undefined;
      element.value = 'sodium';
      expect(element._initialValue).to.equal('sodium');
    });

    it('Should set the field value without mask', () => {
      element.field = {};
      element._processedFieldValue = 'before';
      element.value = 'after';
      expect(element.field.value).to.equal('after');
    });

    it('Should set the mask\'s unmasked value with mask', () => {
      element.field = {};
      element.mask = {};
      element._processedFieldValue = 'before';
      element.value = 'after';
      expect(element.mask.unmaskedValue).to.equal('after');
    });

    it('Should dispatch an event when value is changed manually', () => {
      element.field = {};
      element._processedFieldValue = 'before';
      element.value = 'after';
      expect(element.dispatchEventAndMethod)
        .to.have.been.calledOnceWith('update', 'after');
    });

    it('Should validate the new value when changed manually', () => {
      element._handleFieldValidation = sinon.spy();
      element.field = {};
      element._processedFieldValue = 'before';
      element.value = 'after';
      expect(element._handleFieldValidation)
        .to.have.been.calledOnceWith('after');
    });
  });

  describe('#unmaskedValue', () => {
    beforeEach(() => {
      Object.defineProperty(element, 'field', {
        get () { return this._field; },
        set (value) { this._field = value; }
      });
    });

    it('Should get the value from the mask, if available', () => {
      element.field = { value: 'sun' };
      expect(element.unmaskedValue).to.equal('sun');
    });

    it('Should get the value from the field otherwise', () => {
      element.field = { value: 'sun' };
      element.mask = { unmaskedValue: 'earth' };
      expect(element.unmaskedValue).to.equal('earth');
    });
  });

  describe('#_handleFieldInput()', () => {
    beforeEach(() => {
      Object.defineProperty(element, 'field', {
        get () { return this._field; },
        set (value) { this._field = value; }
      });
    });

    it('Should use the mask value if available', () => {
      element.mask = { unmaskedValue: 'moon' };
      element._handleFieldInput({ stopPropagation: () => {} });
      expect(element.dispatchEventAndMethod)
        .to.have.been.calledOnceWith('update', 'moon');
    });

    it('Should dispatch an event when value is changed in the UI', () => {
      element.field = { value: 'moon' };
      element._handleFieldInput({ stopPropagation: () => {} });
      expect(element.dispatchEventAndMethod)
        .to.have.been.calledOnceWith('update', 'moon');
    });

    it('Should validate the new value when changed in the UI', () => {
      element._handleFieldValidation = sinon.spy();
      element.field = { value: 'moon' };
      element._handleFieldInput({ stopPropagation: () => {} });
      expect(element._handleFieldValidation)
        .to.have.been.calledOnceWith('moon');
    });

    it('Should prevent event propagation', () => {
      element._handleFieldValidation = sinon.spy();
      const spy = sinon.spy();
      element.field = { value: 'moon' };
      element._handleFieldInput({ stopPropagation: spy });
      expect(spy).to.have.been.calledOnce;
    });
  });

  describe('#_handleFieldChange()', () => {
    it('Should prevent event propagation', () => {
      const spy = sinon.spy();
      element._handleFieldChange({ stopPropagation: spy });
      expect(spy).to.have.been.calledOnce;
    });
  });

  describe('#_handleFieldBlur()', () => {
    beforeEach(() => {
      Object.defineProperty(element, 'field', {
        get () { return this._field; },
        set (value) { this._field = value; }
      });
    });

    it('Should validate the new value when changed in the UI', () => {
      element._handleFieldValidation = sinon.spy();
      element.field = { value: 'moon' };
      element._handleFieldBlur();
      expect(element._handleFieldValidation)
        .to.have.been.calledOnceWith('moon');
    });
  });
});
