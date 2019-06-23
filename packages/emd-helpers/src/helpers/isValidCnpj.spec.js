import { expect } from 'chai';
import { isValidCnpj } from './isValidCnpj.js';

describe('isValidCnpj', () => {
  it('Should validate: 13.605.107/0001-05', () => {
    expect(isValidCnpj('13.605.107/0001-05')).to.be.true;
  });

  it('Should validate: 94.077.834/0001-49', () => {
    expect(isValidCnpj('94.077.834/0001-49')).to.be.true;
  });

  it('Should validate: 28.952.537/0001-70', () => {
    expect(isValidCnpj('28.952.537/0001-70')).to.be.true;
  });

  it('Should validate: 47.747.211/0001-56', () => {
    expect(isValidCnpj('47.747.211/0001-56')).to.be.true;
  });

  it('Should validate: 70.581.157/0001-33', () => {
    expect(isValidCnpj('70.581.157/0001-33')).to.be.true;
  });

  it('Should validate: 45.292.364/0001-20', () => {
    expect(isValidCnpj('45.292.364/0001-20')).to.be.true;
  });

  it('Should validate: 43.499.953/0001-59', () => {
    expect(isValidCnpj('43.499.953/0001-59')).to.be.true;
  });

  it('Should validate: 78.685.365/0001-94', () => {
    expect(isValidCnpj('78.685.365/0001-94')).to.be.true;
  });

  it('Should validate: 20004835000127', () => {
    expect(isValidCnpj('20004835000127')).to.be.true;
  });

  it('Should validate: 97862191000132', () => {
    expect(isValidCnpj('97862191000132')).to.be.true;
  });

  it('Should not validate empty argument', () => {
    expect(isValidCnpj()).to.be.false;
  });

  it('Should not validate: 78.685.365', () => {
    expect(isValidCnpj('78.685.365')).to.be.false;
  });

  it('Should not validate: 11111111111111', () => {
    expect(isValidCnpj('11111111111111')).to.be.false;
  });

  it('Should not validate: 12.345.678/0001-99', () => {
    expect(isValidCnpj('12.345.678/0001-99')).to.be.false;
  });
});
