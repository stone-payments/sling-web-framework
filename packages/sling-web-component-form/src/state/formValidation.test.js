import sinon from 'sinon';

import { FORM } from './constant.js';

import {
  treatError,
  atLevel,
  atFieldLevel,
  atFormLevel,
  validate,
  validateField,
  validateFields,
} from './formValidation.js';

describe('treatError', () => {
  it('Should return the message property if passed an Error instance.', () => {
    const error = new Error('test error');
    expect(treatError(error)).to.equal(error.message);
  });

  it('Should return the argument if passed anything but an ' +
    'Error instance.', () => {
    const error = 'test error';
    expect(treatError(error)).to.equal(error);
  });
});

describe('atLevel', () => {
  it('Should return a function.', () => {
    expect(atLevel()).to.be.a('function');
  });

  it('Should receive a wrapper function and execute it ' +
    'without parameters if no validation function is passed.', () => {
    const wrapperFn = sinon.spy();

    atLevel(wrapperFn)();
    expect(wrapperFn).to.have.been.calledOnceWith();
  });

  it('Should execute the validator function with a value.', () => {
    const wrapperFn = sinon.spy();
    const validatorFn = sinon.spy();

    atLevel(wrapperFn)(validatorFn, 'test value');
    expect(validatorFn).to.have.been.calledOnceWith('test value');
  });

  it('Should handle an error that is a string.', () => {
    const wrapperFn = sinon.spy();
    const validatorFn = () => 'error message';

    atLevel(wrapperFn)(validatorFn);
    expect(wrapperFn).to.have.been.calledOnceWith('error message');
  });

  it('Should handle an error that is a Promise that ' +
    'returns a string.', async () => {
    const wrapperFn = sinon.spy();
    const validatorFn = () => Promise.resolve('error message');

    await atLevel(wrapperFn)(validatorFn);
    expect(wrapperFn).to.have.been.calledOnceWith('error message');
  });

  it('Should handle an error that is a Promise that ' +
    'throws an Error.', async () => {
    const wrapperFn = sinon.spy();
    const validatorFn = () => Promise.reject(new Error('error message'));

    await atLevel(wrapperFn)(validatorFn);
    expect(wrapperFn).to.have.been.calledOnceWith('error message');
  });
});

describe('atFieldLevel', () => {
  it('Should call atLevel with a wrapper function ' +
    'that returns a validation error or null.', () => {
    let validatorFn = () => 'error message';
    expect(atFieldLevel(validatorFn)).to.equal('error message');

    validatorFn = () => undefined;
    expect(atFieldLevel(validatorFn)).to.be.null;
  });
});

describe('atFormLevel', () => {
  it('Should call atLevel with a wrapper function ' +
    'that returns a validation error or an empty object.', () => {
    let validatorFn = () => ({ err: 'error message' });
    expect(atFormLevel(validatorFn)).to.eql({ err: 'error message' });

    validatorFn = () => undefined;
    expect(atFormLevel(validatorFn)).to.eql({});
  });
});

describe('validate', () => {
  it('Should return a function.', () => {
    expect(validate()).to.be.a('function');
  });

  it('Should handle byIdReducer state.', () => {
    const stateSpy = sinon.spy();
    const validatorThunk = () => () => undefined;
    const dispatch = sinon.spy();

    const getState = () => ({
      get name() {
        stateSpy();
        return null;
      },
    });

    validate('name', validatorThunk)(dispatch, getState);
    expect(stateSpy).to.have.been.calledOnce;
  });

  it('Should handle formReducer state.', () => {
    const stateSpy = sinon.spy();
    const validatorThunk = () => () => undefined;
    const dispatch = sinon.spy();

    const getState = () => ({
      byId: {
        get name() {
          stateSpy();
          return null;
        },
      },
    });

    validate('name', validatorThunk)(dispatch, getState);
    expect(stateSpy).to.have.been.calledOnce;
  });

  it('Should cancel the previous validation if ' +
    'it exists and has a cancel method.', () => {
    const validatorThunk = () => () => undefined;
    const dispatch = sinon.spy();

    const state = {
      name: {
        validation: {
          cancel: sinon.spy(),
        },
      },
    };

    const getState = () => state;

    validate('name', validatorThunk)(dispatch, getState);
    expect(state.name.validation.cancel).to.have.been.calledOnce;
  });

  it('Should dispatch finishValidation if ' +
    'validation does not return a Promise.', () => {
    const validatorThunk = () => 'test message';

    const start = sinon.spy();
    const finish = sinon.spy();
    const dispatch = sinon.spy();

    const state = { name: {} };
    const getState = () => state;

    validate('name', validatorThunk, start, finish)(dispatch, getState);

    expect(start).not.to.have.been.called;
    expect(finish).to.have.been.calledOnceWith('name', 'test message');
  });

  it('Should dispatch both startValidation and finishValidation if ' +
    'validation returns a Promise.', async () => {
    const validator = Promise.resolve('test message');
    const validatorThunk = () => validator;

    const start = sinon.spy();
    const finish = sinon.spy();
    const dispatch = sinon.spy();

    const state = { name: {} };
    const getState = () => state;

    await validate('name', validatorThunk, start, finish)(dispatch, getState);

    expect(start).to.have.been.calledOnceWith('name', validator);
    expect(finish).to.have.been.calledOnceWith('name', 'test message');
  });

  it('Should dispatch only startValidation if validation returns ' +
    'a Promise but the field is remove.', async () => {
    const validator = Promise.resolve('test message');
    const validatorThunk = () => validator;

    const start = sinon.spy();
    const finish = sinon.spy();
    const dispatch = sinon.spy();

    let count = 0;

    const getState = () => {
      if (count === 0) {
        count += 1;
        return { name: {} };
      }
      return {};
    };

    await validate('name', validatorThunk, start, finish)(dispatch, getState);

    expect(start).to.have.been.calledOnceWith('name', validator);
    expect(finish).not.to.have.been.called;
  });
});

describe('validateField', () => {
  it('Should be a shortcut for validate.', () => {
    expect(validateField()).to.be.a('function');
  });

  it('Should call validation with a fieldId and a validation thunk.', () => {
    const validatorFn = sinon.spy();
    const apply = sinon.spy();
    const at = sinon.spy();

    validateField('name', validatorFn, 'stone', apply, at);
    expect(apply).to.have.been.calledOnceWith('name');

    const validatorThunk = apply.args[0][1];
    validatorThunk();
    expect(at).to.have.been.calledOnceWith(validatorFn, 'stone');
  });
});

describe('validateFields', () => {
  it('Should be a shortcut for validate.', () => {
    expect(validateFields()).to.be.a('function');
  });

  it('Should call validation with FORM and a validation thunk.', () => {
    const validatorFn = sinon.spy();
    const apply = sinon.spy();
    const at = sinon.spy();

    validateFields(validatorFn, 'stone', apply, at);
    expect(apply).to.have.been.calledOnceWith(FORM);

    const validatorThunk = apply.args[0][1];
    validatorThunk();
    expect(at).to.have.been.calledOnceWith(validatorFn, 'stone');
  });
});
