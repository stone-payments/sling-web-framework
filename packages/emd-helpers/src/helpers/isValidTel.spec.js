import { expect } from 'chai';
import { isValidTel } from './isValidTel.js';

describe('isValidTel', () => {
  it('Should validate: (21) 2222-2222', () => {
    expect(isValidTel('(21) 2222-2222')).to.be.true;
  });

  it('Should validate: (21) 92222-2222', () => {
    expect(isValidTel('(21) 92222-2222')).to.be.true;
  });

  it('Should validate: (11) 83333-3333', () => {
    expect(isValidTel('(11) 83333-3333')).to.be.true;
  });

  it('Should validate: (11) 2333-3333', () => {
    expect(isValidTel('(11) 2333-3333')).to.be.true;
  });

  it('Should validate: (11) 2333 3333', () => {
    expect(isValidTel('(11) 2333 3333')).to.be.true;
  });

  it('Should validate: 21 92222 2222', () => {
    expect(isValidTel('21 92222 2222')).to.be.true;
  });

  it('Should validate: 11 23333333', () => {
    expect(isValidTel('11 23333333')).to.be.true;
  });

  it('Should validate: 2122222222', () => {
    expect(isValidTel('2122222222')).to.be.true;
  });

  it('Should validate: 11922222222', () => {
    expect(isValidTel('11922222222')).to.be.true;
  });

  it('Should not validate empty argument', () => {
    expect(isValidTel()).to.be.false;
  });

  it('Should not validate: 92222-2222', () => {
    expect(isValidTel('92222-2222')).to.be.false;
  });

  it('Should not validate: 2222-2222', () => {
    expect(isValidTel('2222-2222')).to.be.false;
  });
});
