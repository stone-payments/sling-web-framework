import {
  treatError,
  // atLevel,
  // atFieldLevel,
  // atFormLevel,
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

});
