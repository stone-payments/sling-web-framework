import chai from 'chai';
import { isValidPhone } from './isValidPhone.js';

const { expect } = chai;

describe('isValidPhone', () => {
  it('Should not validate “(00) 00-0000”.', () => {
    expect(isValidPhone('(00) 00-0000')).to.equal(false);
  });

  it('Should not validate “(00) 000-0000”.', () => {
    expect(isValidPhone('(00) 000-0000')).to.equal(false);
  });

  it('Should not validate “(00) 0000-00”.', () => {
    expect(isValidPhone('(00) 0000-00')).to.equal(false);
  });

  it('Should not validate “(00) 0000-000”.', () => {
    expect(isValidPhone('(00) 0000-000')).to.equal(false);
  });

  it('Should not validate “(00) 0000-00000”.', () => {
    expect(isValidPhone('(00) 0000-00000')).to.equal(false);
  });

  it('Should not validate “(000000-0000”.', () => {
    expect(isValidPhone('(000000-0000')).to.equal(false);
  });

  it('Should not validate “00)0000-0000”.', () => {
    expect(isValidPhone('00)0000-0000')).to.equal(false);
  });

  it('Should not validate “(00) 0000.0000”.', () => {
    expect(isValidPhone('(00) 0000.0000')).to.equal(false);
  });

  it('Should validate “(00) 0000-0000”.', () => {
    expect(isValidPhone('(00) 0000-0000')).to.equal(true);
  });

  it('Should validate “(00) 00000-0000”.', () => {
    expect(isValidPhone('(00) 00000-0000')).to.equal(true);
  });

  it('Should validate “(00)0000-0000”.', () => {
    expect(isValidPhone('(00)0000-0000')).to.equal(true);
  });

  it('Should validate “(00)00000-0000”.', () => {
    expect(isValidPhone('(00)00000-0000')).to.equal(true);
  });

  it('Should validate “(00) 00000000”.', () => {
    expect(isValidPhone('(00) 00000000')).to.equal(true);
  });

  it('Should validate “(00) 000000000”.', () => {
    expect(isValidPhone('(00) 000000000')).to.equal(true);
  });

  it('Should validate “(00)00000000”.', () => {
    expect(isValidPhone('(00)00000000')).to.equal(true);
  });

  it('Should validate “(00)000000000”.', () => {
    expect(isValidPhone('(00)000000000')).to.equal(true);
  });

  it('Should validate “00 0000-0000”.', () => {
    expect(isValidPhone('00 0000-0000')).to.equal(true);
  });

  it('Should validate “00 00000-0000”.', () => {
    expect(isValidPhone('00 00000-0000')).to.equal(true);
  });

  it('Should validate “000000-0000”.', () => {
    expect(isValidPhone('000000-0000')).to.equal(true);
  });

  it('Should validate “0000000-0000”.', () => {
    expect(isValidPhone('0000000-0000')).to.equal(true);
  });

  it('Should validate “00 00000000”.', () => {
    expect(isValidPhone('00 00000000')).to.equal(true);
  });

  it('Should validate “00 000000000”.', () => {
    expect(isValidPhone('00 000000000')).to.equal(true);
  });

  it('Should validate “0000000000”.', () => {
    expect(isValidPhone('0000000000')).to.equal(true);
  });

  it('Should validate “00000000000”.', () => {
    expect(isValidPhone('00000000000')).to.equal(true);
  });
});
