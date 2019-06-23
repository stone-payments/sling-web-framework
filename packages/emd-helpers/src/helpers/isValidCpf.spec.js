import { expect } from 'chai';
import { isValidCpf } from './isValidCpf.js';

describe('isValidCpf', () => {
  it('Shoud validate: 386.731.898-02', () => {
    expect(isValidCpf('386.731.898-02')).to.be.true;
  });

  it('Shoud validate: 473.435.778-16', () => {
    expect(isValidCpf('473.435.778-16')).to.be.true;
  });

  it('Shoud validate: 217.875.688-30', () => {
    expect(isValidCpf('217.875.688-30')).to.be.true;
  });

  it('Shoud validate: 823.053.963-41', () => {
    expect(isValidCpf('823.053.963-41')).to.be.true;
  });

  it('Shoud validate: 363.657.667-42', () => {
    expect(isValidCpf('363.657.667-42')).to.be.true;
  });

  it('Shoud validate: 630.443.746-34', () => {
    expect(isValidCpf('630.443.746-34')).to.be.true;
  });

  it('Shoud validate: 929.545.734-06', () => {
    expect(isValidCpf('929.545.734-06')).to.be.true;
  });

  it('Shoud validate: 845.879.785-23', () => {
    expect(isValidCpf('845.879.785-23')).to.be.true;
  });

  it('Shoud validate: 389.336.578-86', () => {
    expect(isValidCpf('389.336.578-86')).to.be.true;
  });

  it('Shoud validate: 456.610.698-55', () => {
    expect(isValidCpf('456.610.698-55')).to.be.true;
  });

  it('Shoud validate: 09710841734', () => {
    expect(isValidCpf('09710841734')).to.be.true;
  });

  it('Shoud validate: 96238179678', () => {
    expect(isValidCpf('96238179678')).to.be.true;
  });

  it('Should not validate empty argument', () => {
    expect(isValidCpf()).to.be.false;
  });

  it('Shoud not validate: 456.610.698', () => {
    expect(isValidCpf('456.610.698')).to.be.false;
  });
});
