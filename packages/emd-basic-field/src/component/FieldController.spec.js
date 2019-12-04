import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
const { expect } = chai;

const win = global.window;
let FieldController;
let Controller;
let element;

const FakeHTML = class {};
FakeHTML.prototype.attachShadow = sinon.spy();
FakeHTML.prototype.querySelector = sinon.spy();
FakeHTML.prototype.shadowRoot = new FakeHTML();

describe('FieldController', () => {
  beforeEach(async () => {
    global.window = {};
    ({ FieldController } = await import('./FieldController.js'));
    Controller = FieldController(FakeHTML);

    element = new Controller();
    element.dispatchEventAndMethod = sinon.spy();
    element._handleFieldValidation = sinon.spy();

    Object.defineProperty(element, '_processedFieldValue', {
      get () { return this.__processedFieldValue; },
      set (value) { this.__processedFieldValue = value; }
    });

    Object.defineProperty(element, 'field', {
      get () { return this._field; },
      set (value) { this._field = value; }
    });
  });

  afterEach(() => {
    global.window = win;
    Controller = undefined;
    element = undefined;
  });

  describe('#value', () => {
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

  describe('#_handleFieldInput()', () => {
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
});
