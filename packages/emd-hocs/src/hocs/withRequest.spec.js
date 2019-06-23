import { expect } from 'chai';
import { withRequest } from './withRequest.js';

class Dummy extends withRequest() {}
const dummy = new Dummy();

describe('withRequest', () => {
  it('Should include withLoadingAndErrorHandling', () => {
    expect(dummy._loading).to.equal(0);
    expect(dummy.isLoading).to.be.false;
    expect(dummy.request).to.be.a('function');
  });

  it('Should include withRequestParams', () => {
    expect(dummy.requestParams).to.be.an('object');
  });
});
