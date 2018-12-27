import sinon from 'sinon';

import {
  treatError,
  atLevel,
  atFieldLevel,
  atFormLevel,
  // validate,
  // validateField,
  // validateFields,
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
