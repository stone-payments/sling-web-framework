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

const formElement = {
  nodeName: FORM_TYPES[0],
};

const fieldElement = {
  nodeName: FORM_FIELD_TYPES[0],
};

const messageElement = {
  nodeName: FORM_FIELD_MESSAGE_TYPES[0],
};

const submitButtonElement = {
  nodeName: FORM_SUBMIT_TYPES[0],
  type: 'submit',
};

const resetButtonElement = {
  nodeName: FORM_SUBMIT_TYPES[0],
  type: 'reset',
};

describe('withForm', () => {
  beforeEach(() => {
    MutObserver = sinon.spy();
    MutObserver.prototype.observe = sinon.spy();
    MutObserver.prototype.disconnect = sinon.spy();

    WithForm = withForm(undefined, MutObserver);

    form = new WithForm();
    form.shadowRoot = { ...shadowRoot };
    form.dispatchAction = sinon.spy();
  });

  afterEach(() => {
    MutObserver = undefined;
    WithForm = undefined;
    form = undefined;
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
      expect(WithForm.isForm(formElement)).to.be.true;
    });
  });

  describe('.isFormField()', () => {
    it('Should return false if a DOM element is not a field element.', () => {
      expect(WithForm.isFormField({})).to.be.false;
    });

    it('Should return true if a DOM element is a field element.', () => {
      expect(WithForm.isFormField(fieldElement)).to.be.true;
    });
  });

  describe('.isFormFieldMessage()', () => {
    it('Should return false if a DOM element is not a message element.', () => {
      expect(WithForm.isFormFieldMessage({})).to.be.false;
    });

    it('Should return true if a DOM element is a message element.', () => {
      expect(WithForm.isFormFieldMessage(messageElement)).to.be.true;
    });
  });

  describe('.isSubmitButton()', () => {
    it('Should return false if a DOM element is not a submit button.', () => {
      expect(WithForm.isSubmitButton({})).to.be.false;
    });

    it('Should return true if a DOM element is a submit button.', () => {
      expect(WithForm.isSubmitButton(submitButtonElement)).to.be.true;
    });
  });

  describe('.isResetButton()', () => {
    it('Should return false if a DOM element is not a reset button.', () => {
      expect(WithForm.isResetButton({})).to.be.false;
    });

    it('Should return true if a DOM element is a reset button.', () => {
      expect(WithForm.isResetButton(resetButtonElement)).to.be.true;
    });
  });

  describe('.getFieldId()', () => {
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

  describe('#form', () => {
    it('Should return a single form element, if found.', () => {
      form.shadowRoot.querySelectorAll = () => [formElement];
      expect(form.form).to.deep.equal(formElement);
    });

    it('Should return undefined if a form element is not found.', () => {
      form.shadowRoot.querySelectorAll = () => [];
      expect(form.form).to.be.undefined;
    });

    it('Should return undefined if shadowRoot does not exist yet.', () => {
      form.shadowRoot = undefined;
      expect(form.form).to.be.undefined;
    });
  });

  describe('#fields', () => {
    it('Should return an array of form fields, if found.', () => {
      form.shadowRoot.querySelectorAll = () => [formElement];
      form.form.querySelectorAll = () => [fieldElement];
      expect(form.fields).to.deep.equal([fieldElement]);
    });

    it('Should return an empty array if form fields are not found.', () => {
      form.shadowRoot.querySelectorAll = () => [formElement];
      form.form.querySelectorAll = () => [];
      expect(form.fields).to.be.empty;
    });

    it('Should return undefined if shadowRoot does not exist yet.', () => {
      form.shadowRoot = undefined;
      expect(form.fields).to.be.empty;
    });
  });

  describe('#fieldMessages', () => {
    it('Should return an array of form messages, if found.', () => {
      form.shadowRoot.querySelectorAll = () => [formElement];
      form.form.querySelectorAll = () => [messageElement];
      expect(form.fieldMessages).to.deep.equal([messageElement]);
    });

    it('Should return an empty array if form messages are not found.', () => {
      form.shadowRoot.querySelectorAll = () => [formElement];
      form.form.querySelectorAll = () => [];
      expect(form.fieldMessages).to.be.empty;
    });

    it('Should return undefined if shadowRoot does not exist yet.', () => {
      form.shadowRoot = undefined;
      expect(form.fieldMessages).to.be.empty;
    });
  });

  describe('#submitButton', () => {
    it('Should return a single submit button, if found.', () => {
      form.shadowRoot.querySelectorAll = () => [formElement];
      form.form.querySelectorAll = () => [submitButtonElement];
      expect(form.submitButton).to.deep.equal(submitButtonElement);
    });

    it('Should return undefined if a submit button is not found.', () => {
      form.shadowRoot.querySelectorAll = () => [formElement];
      form.form.querySelectorAll = () => [];
      expect(form.submitButton).to.be.undefined;
    });

    it('Should return undefined if shadowRoot does not exist yet.', () => {
      form.shadowRoot = undefined;
      expect(form.submitButton).to.be.undefined;
    });
  });

  describe('#resetButton', () => {
    it('Should return a single reset button, if found.', () => {
      form.shadowRoot.querySelectorAll = () => [formElement];
      form.form.querySelectorAll = () => [resetButtonElement];
      expect(form.resetButton).to.deep.equal(resetButtonElement);
    });

    it('Should return undefined if a reset button is not found.', () => {
      form.shadowRoot.querySelectorAll = () => [formElement];
      form.form.querySelectorAll = () => [];
      expect(form.resetButton).to.be.undefined;
    });

    it('Should return undefined if shadowRoot does not exist yet.', () => {
      form.shadowRoot = undefined;
      expect(form.resetButton).to.be.undefined;
    });
  });

  describe('#state', () => {
    it('Should correctly get and set state.', () => {
      form.state = { ub: 40 };
      expect(form.state).to.deep.equal({ ub: 40 });
    });

    it('Should also set formState when setting state, ' +
      'which is the same as state without byId.', () => {
      form.state = {
        byId: {},
        values: {},
      };

      expect(form.formState).to.deep.equal({ values: {} });
    });

    it('Should execute handleStateUpdate when setting state.', () => {
      form.handleStateUpdate = sinon.spy();

      form.state = {
        byId: {},
        values: {},
      };

      expect(form.handleStateUpdate)
        .to.have.been.calledOnceWith({ values: {} });
    });
  });

  describe('#addField()', () => {
    it('Should dispatch a reducer action', () => {
      form.addField('id');
      expect(form.dispatchAction).to.have.been.calledOnce;
    });
  });
});
