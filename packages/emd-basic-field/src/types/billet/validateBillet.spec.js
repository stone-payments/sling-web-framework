import { expect } from 'chai';
import { validateBillet } from './validateBillet.js';

describe('validateBillet', () => {
  it('Should return undefined when receiving no arguments', () => {
    expect(validateBillet()).to.be.undefined;
  });

  it('Should return undefined when receiving empty string', () => {
    expect(validateBillet('')).to.be.undefined;
  });

  it('Should return message when receiving invalid value', () => {
    const barcode = {
      caseOne: 'XXX9999999-X 99999999999-9 99999999999-C 99999999999-A',
      caseTwo: 'ABC45678d12398-391203821397083921372173-832932',
      caseThree: '///&**(*$(#$#&ˆ$ˆ&%@@#ˆ$#@%'
    };

    expect(validateBillet(barcode.caseOne)).to.be.a('string');
    expect(validateBillet(barcode.caseTwo)).to.be.a('string');
    expect(validateBillet(barcode.caseThree)).to.be.a('string');
  });

  it('Should return undefined when receiving a valid string', () => {
    const barcode = {
      billet: '99999999999-9 99999999999-9 99999999999-9 99999999999-9',
      convenio: '85555.55555 55555.555555 55555.555555 5 55555555555555',
      outher: '59999999999-9 99999999999-9 99999999999-9 99999999999-9'
    };

    expect(validateBillet(barcode.billet)).to.be.undefined;
    expect(validateBillet(barcode.convenio)).to.be.undefined;
    expect(validateBillet(barcode.outher)).to.be.undefined;
  });
});
