import sinon from 'sinon';
import {
  withForm,
  FORM_TYPES,
  FORM_FIELD_TYPES,
  FORM_FIELD_MESSAGE_TYPES,
  FORM_SUBMIT_TYPES,
} from './withForm.js';

let MutObserver;
let WithForm;
let form;

const shadowRoot = {};
shadowRoot.querySelectorAll = () => [];
shadowRoot.addEventListener = sinon.spy();
shadowRoot.removeEventListener = sinon.spy();

describe('withForm', () => {
  beforeEach(() => {
    MutObserver = sinon.spy();
    MutObserver.prototype.observe = sinon.spy();
    MutObserver.prototype.disconnect = sinon.spy();

    WithForm = withForm(undefined, MutObserver);
    form = new WithForm();
    form.shadowRoot = { ...shadowRoot };
  });

  afterEach(() => {
    MutObserver = null;
    WithForm = null;
    form = null;
  });

  describe('#connectedCallback()', () => {
    it('Should call super.connectedCallback if it exists.', () => {
      class Faker {}
      Faker.prototype.connectedCallback = sinon.spy();

      WithForm = withForm(Faker, MutObserver);
      form = new WithForm();
      form.shadowRoot = { ...shadowRoot };

      form.connectedCallback();

      expect(Faker.prototype.connectedCallback).to.have.been.calledOnce;
    });

    it('Should register a mutation observer that ' +
      'calls handleDomUpdate.', () => {
      form.handleDomUpdate = sinon.spy();
      form.connectedCallback();

      expect(MutObserver.prototype.observe)
        .to.have.been.calledOnceWith(form.shadowRoot, {
          childList: true,
          subtree: true,
        });
    });

    it('Should attach event listeners to the shadowRoot.', () => {
      form.connectedCallback();
      expect(form.shadowRoot.addEventListener).to.have.been.called;
    });

    it('Should call handleDomUpdate without parameters.', () => {
      form.handleDomUpdate = sinon.spy();
      form.connectedCallback();
      expect(form.handleDomUpdate).to.have.been.calledOnceWith();
    });
  });

  describe('#disconnectedCallback()', () => {
    it('Should call super.disconnectedCallback if it exists.', () => {
      class Faker {}
      Faker.prototype.disconnectedCallback = sinon.spy();

      WithForm = withForm(Faker, MutObserver);
      form = new WithForm();
      form.shadowRoot = { ...shadowRoot };

      form.disconnectedCallback();

      expect(Faker.prototype.disconnectedCallback).to.have.been.calledOnce;
    });

    it('Should unregister a mutation observer.', () => {
      form.disconnectedCallback();
      expect(MutObserver.prototype.disconnect).to.have.been.calledOnce;
    });

    it('Should remove event listeners to the shadowRoot.', () => {
      form.disconnectedCallback();
      expect(form.shadowRoot.removeEventListener).to.have.been.called;
    });
  });

  describe('.isForm()', () => {
    it('Should return false if a DOM element is not a form element.', () => {
      expect(WithForm.isForm({})).to.be.false;
    });

    it('Should return true if a DOM element is a form element.', () => {
      const [nodeName] = FORM_TYPES;
      expect(WithForm.isForm({ nodeName })).to.be.true;
    });
  });

  describe('.isFormField()', () => {
    it('Should return false if a DOM element is not a field element.', () => {
      expect(WithForm.isFormField({})).to.be.false;
    });

    it('Should return true if a DOM element is a field element.', () => {
      const [nodeName] = FORM_FIELD_TYPES;
      expect(WithForm.isFormField({ nodeName })).to.be.true;
    });
  });

  describe('.isFormFieldMessage()', () => {
    it('Should return false if a DOM element is not a message element.', () => {
      expect(WithForm.isFormFieldMessage({})).to.be.false;
    });

    it('Should return true if a DOM element is a message element.', () => {
      const [nodeName] = FORM_FIELD_MESSAGE_TYPES;
      expect(WithForm.isFormFieldMessage({ nodeName })).to.be.true;
    });
  });

  describe('.isSubmitButton()', () => {
    it('Should return false if a DOM element is not a submit button.', () => {
      expect(WithForm.isSubmitButton({})).to.be.false;
    });

    it('Should return true if a DOM element is a submit button.', () => {
      const [nodeName] = FORM_SUBMIT_TYPES;
      const type = 'submit';
      expect(WithForm.isSubmitButton({ nodeName, type })).to.be.true;
    });
  });

  describe('.isResetButton()', () => {
    it('Should return false if a DOM element is not a reset button.', () => {
      expect(WithForm.isResetButton({})).to.be.false;
    });

    it('Should return true if a DOM element is a reset button.', () => {
      const [nodeName] = FORM_SUBMIT_TYPES;
      const type = 'reset';
      expect(WithForm.isResetButton({ nodeName, type })).to.be.true;
    });
  });

  describe('.getFieldId', () => {
    it('Should return a field id being its ' +
      'name property or id property.', () => {
      let fakeField;

      fakeField = { name: 'stone' };
      expect(WithForm.getFieldId(fakeField)).to.equal('stone');

      fakeField = { id: 'stone' };
      expect(WithForm.getFieldId(fakeField)).to.equal('stone');

      fakeField = { name: 'stone', id: 'payments' };
      expect(WithForm.getFieldId(fakeField)).to.equal('stone');
    });
  });
});
