import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { LoginController } from './LoginController.js';

chai.use(sinonChai);
const { expect } = chai;

const pendingPromise = new Promise(() => {});

let DummyClass;
let dummy;

describe('LoginController', () => {
  beforeEach(() => {
    DummyClass = LoginController();
    dummy = new DummyClass();

    dummy.renderRoot = {
      querySelector: sinon.spy(),
      querySelectorAll: sinon.stub().returns([])
    };

    dummy.dispatchEventAndMethod = sinon.spy();
  });

  afterEach(() => {
    DummyClass = undefined;
    dummy = undefined;
  });

  describe('#constructor()', () => {
    it('Should initialize step with 1', () => {
      expect(dummy.step).to.equal(1);
    });
  });

  describe('.properties', () => {
    it('Should declare properties', () => {
      expect(DummyClass.properties).to.have.property('email');
      expect(DummyClass.properties).to.have.property('step');
      expect(DummyClass.properties).to.have.property('loading');
      expect(Object.keys(DummyClass.properties).length).to.equal(3);
    });
  });

  describe('#maxSteps', () => {
    it('Should find slides', () => {
      dummy.maxSteps;

      expect(dummy.renderRoot.querySelectorAll)
        .to.have.been.calledOnceWith('.emd-login__slide');
    });

    it('Should count slides found', () => {
      dummy.renderRoot.querySelectorAll = () => ['A', 'B', 'C'];
      expect(dummy.maxSteps).to.equal(3);
    });
  });

  describe('#emailForm', () => {
    it('Should select the email form element', () => {
      dummy.emailForm;

      expect(dummy.renderRoot.querySelector)
        .to.have.been.calledOnceWith('.emd-login__form_email');
    });
  });

  describe('#currentForm', () => {
    it('Should select the form in the current slide element', () => {
      dummy.currentForm;

      expect(dummy.renderRoot.querySelector)
        .to.have.been.calledOnceWith('.emd-login__slide_current emd-form');
    });
  });

  describe('#currentField', () => {
    it('Should select the form in the current slide element', () => {
      dummy.currentField;

      expect(dummy.renderRoot.querySelector)
        .to.have.been.calledOnceWith('.emd-login__slide_current emd-field');
    });
  });

  describe('#attributeChangedCallback()', () => {
    it('Should call parent method if it exists', () => {
      class Parent {}
      Parent.prototype.attributeChangedCallback = sinon.spy();

      DummyClass = LoginController(Parent);
      dummy = new DummyClass();
      dummy.attributeChangedCallback();

      expect(Parent.prototype.attributeChangedCallback)
        .to.have.been.calledOnce;
    });

    it('Should update email if it has changed', () => {
      dummy._updateEmail = sinon.spy();
      dummy.attributeChangedCallback('email', '123@old.com', '123@new.com');

      expect(dummy._updateEmail).to.have.been.calledOnce;
    });

    it('Should not update email if it has not changed', () => {
      dummy._updateEmail = sinon.spy();
      dummy.attributeChangedCallback('email', '123@old.com', '123@old.com');

      expect(dummy._updateEmail).not.to.have.been.calledOnce;
    });

    it('Should validate step if it or email have changed', () => {
      dummy._updateEmail = sinon.spy();
      dummy._validateStep = sinon.spy();

      dummy.attributeChangedCallback('email', '123@old.com', '123@new.com');
      dummy.attributeChangedCallback('step', '1', '2');

      expect(dummy._validateStep).to.have.been.calledTwice;
    });

    it('Should not validate step if it or email have not changed', () => {
      dummy._updateEmail = sinon.spy();
      dummy._validateStep = sinon.spy();

      dummy.attributeChangedCallback('email', '123@old.com', '123@old.com');
      dummy.attributeChangedCallback('step', '1', '1');

      expect(dummy._validateStep).not.to.have.been.called;
    });
  });

  describe('#_updateEmail', () => {
    beforeEach(() => {
      Object.defineProperty(dummy, 'emailForm', {
        get () { return this._emailForm; },
        set (value) { this._emailForm = value; }
      });
    });

    it('Should wait the DOM to update if form does not exist', () => {
      const spy = sinon.stub().returns(pendingPromise);

      Object.defineProperty(dummy, 'updateComplete', {
        get: spy
      });

      dummy.emailForm = null;
      dummy._updateEmail();

      expect(spy).to.have.been.calledOnce;
    });

    it('Should update the email form with the email', async () => {
      dummy.emailForm = {
        setValues: sinon.spy()
      };

      dummy.email = '123@email.com';
      await dummy._updateEmail();

      expect(dummy.emailForm.setValues).to.have.been.calledOnceWith({
        email: '123@email.com'
      });
    });
  });

  describe('#_validateStep', () => {
    beforeEach(() => {
      Object.defineProperties(dummy, {
        emailForm: {
          get () { return this._emailForm; },
          set (value) { this._emailForm = value; }
        },
        maxSteps: {
          get () { return this._maxSteps; },
          set (value) { this._maxSteps = value; }
        }
      });
    });

    it('Should wait the DOM to update if form does not exist', () => {
      const spy = sinon.stub().returns(pendingPromise);

      Object.defineProperty(dummy, 'updateComplete', {
        get: spy
      });

      dummy.emailForm = null;
      dummy._validateStep();

      expect(spy).to.have.been.calledOnce;
    });

    it('Should wait the DOM to update if email does not exist', () => {
      const spy = sinon.stub().returns(pendingPromise);

      Object.defineProperty(dummy, 'updateComplete', {
        get: spy
      });

      dummy.email = null;
      dummy._validateStep();

      expect(spy).to.have.been.calledOnce;
    });

    it('Should not allow step less then 1', async () => {
      dummy.step = 0;
      await dummy._validateStep();

      expect(dummy.step).to.equal(1);
    });

    it('Should not allow step less than maxSteps', async () => {
      dummy.maxSteps = 2;
      dummy.step = 3;
      await dummy._validateStep();

      expect(dummy.step).to.equal(dummy.maxSteps);
    });

    it('Should go back to step 1 and reset email form ' +
      'if email is invalid on step 2', async () => {
      dummy.maxSteps = 2;
      dummy.emailForm = {};
      dummy.emailForm.submitForm = sinon.spy();

      dummy.step = 2;
      dummy.email = '';

      await dummy._validateStep();

      expect(dummy.step).to.equal(1);
      expect(dummy.emailForm.submitForm).to.have.been.calledOnce;
    });
  });

  describe('#setStep()', () => {
    it('Should return a function', () => {
      expect(dummy.setStep()).to.be.a('function');
    });

    it('Should set step', () => {
      dummy.setStep(2)();
      expect(dummy.step).to.equal(2);
    });
  });

  describe('#quit()', () => {
    beforeEach(() => {
      Object.defineProperty(dummy, 'currentForm', {
        get () { return this._currentForm; },
        set (value) { this._currentForm = value; }
      });

      dummy.currentForm = {};
      dummy.currentForm.finishSubmission = sinon.spy();
    });

    it('Should submit the current form', async () => {
      await dummy.quit();
      expect(dummy.currentForm.finishSubmission).to.have.been.calledOnce;
    });

    it('Should set loading to false', async () => {
      await dummy.quit();
      expect(dummy.loading).to.be.false;
    });
  });

  describe('#nextStep()', () => {
    beforeEach(() => {
      Object.defineProperty(dummy, 'currentForm', {
        get () { return this._currentForm; },
        set (value) { this._currentForm = value; }
      });

      dummy.currentForm = {};
      dummy.currentForm.finishSubmission = sinon.spy();
    });

    it('Should submit the current form', async () => {
      await dummy.nextStep();
      expect(dummy.currentForm.finishSubmission).to.have.been.calledOnce;
    });

    it('Should set loading to false', async () => {
      await dummy.nextStep();
      expect(dummy.loading).to.be.false;
    });

    it('Should increment step by one', async () => {
      dummy.step = 1;
      await dummy.nextStep();
      expect(dummy.step).to.equal(2);
    });
  });

  describe('#handleForgotEmail()', () => {
    it('Should dispatch event', () => {
      dummy.handleForgotEmail();
      expect(dummy.dispatchEventAndMethod)
        .to.have.been.calledOnceWith('forgotemail');
    });
  });

  describe('#handleForgotPassword()', () => {
    it('Should dispatch event', () => {
      dummy.handleForgotPassword();
      expect(dummy.dispatchEventAndMethod)
        .to.have.been.calledOnceWith('forgotpassword');
    });
  });

  describe('#handleSubmitSuccess()', () => {
    it('Should dispatch emailsubmitsuccess with email', () => {
      const detail = { email: '123@email.com' };
      dummy.handleSubmitSuccess({ detail });

      expect(dummy.dispatchEventAndMethod)
        .to.have.been.calledWith('emailsubmitsuccess', {
          email: '123@email.com'
        });
    });

    it('Should not expose password on emailsubmitsuccess', () => {
      const detail = { email: '123@email.com' };
      dummy.password = '123456';
      dummy.handleSubmitSuccess({ detail });

      expect(dummy.dispatchEventAndMethod)
        .to.have.been.calledWith('emailsubmitsuccess', {
          email: '123@email.com'
        });
    });

    it('Should dispatch passwordsubmitsuccess with email and password', () => {
      dummy.email = '123@email.com';
      const detail = { password: '123456' };
      dummy.handleSubmitSuccess({ detail });

      expect(dummy.dispatchEventAndMethod)
        .to.have.been.calledWith('passwordsubmitsuccess', {
          email: '123@email.com',
          password: '123456'
        });
    });

    it('Should set loading do true', () => {
      dummy.handleSubmitSuccess({ detail: {} });
      expect(dummy.loading).to.be.true;
    });

    it('Should set email according to the event', () => {
      const detail = { email: '123@email.com' };
      dummy.handleSubmitSuccess({ detail });
      expect(dummy.email).to.equal('123@email.com');
    });
  });

  describe('#handleSubmitError()', () => {
    it('Should finish form submission', () => {
      const target = {};
      target.finishSubmission = sinon.spy();

      dummy.handleSubmitError({ target });
      expect(target.finishSubmission).to.have.been.calledOnce;
    });
  });

  describe('#handleKeyPress()', () => {
    it('Should submit form if enter key was pressed', () => {
      Object.defineProperty(dummy, 'currentForm', {
        get () { return this._currentForm; },
        set (value) { this._currentForm = value; }
      });

      dummy.currentForm = {};
      dummy.currentForm.submitForm = sinon.spy();

      dummy.handleKeyPress({ keyCode: 0 });
      expect(dummy.currentForm.submitForm).not.to.have.been.called;

      dummy.handleKeyPress({ keyCode: 13 });
      expect(dummy.currentForm.submitForm).to.have.been.calledOnce;
    });
  });

  describe('#handleTransitionEnd()', () => {
    it('Should focus on the current field when slide animation ends', () => {
      Object.defineProperty(dummy, 'currentField', {
        get () { return this._currentField; },
        set (value) { this._currentField = value; }
      });

      dummy.currentField = {};
      dummy.currentField.focus = sinon.spy();

      dummy.handleTransitionEnd();
      expect(dummy.currentField.focus).to.have.been.calledOnce;
    });
  });
});
