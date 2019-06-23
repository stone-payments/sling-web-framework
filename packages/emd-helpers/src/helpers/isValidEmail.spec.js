import { expect } from 'chai';
import { isValidEmail } from './isValidEmail.js';

describe('isValidEmail', () => {
  it('Should validate: email@domain.com', () => {
    expect(isValidEmail('email@domain.com')).to.be.true;
  });

  it('Should validate: firstname.lastname@domain.com', () => {
    expect(isValidEmail('firstname.lastname@domain.com')).to.be.true;
  });

  it('Should validate: email@subdomain.domain.com', () => {
    expect(isValidEmail('email@subdomain.domain.com')).to.be.true;
  });

  it('Should validate: firstname+lastname@domain.com', () => {
    expect(isValidEmail('firstname+lastname@domain.com')).to.be.true;
  });

  it('Should validate: "email"@domain.com', () => {
    expect(isValidEmail('"email"@domain.com')).to.be.true;
  });

  it('Should validate: 1234567890@domain.com', () => {
    expect(isValidEmail('1234567890@domain.com')).to.be.true;
  });

  it('Should validate: email@domain-one.com', () => {
    expect(isValidEmail('email@domain-one.com')).to.be.true;
  });

  it('Should validate: _______@domain.com', () => {
    expect(isValidEmail('_______@domain.com')).to.be.true;
  });

  it('Should validate: email@domain.name', () => {
    expect(isValidEmail('email@domain.name')).to.be.true;
  });

  it('Should validate: email@domain.co.jp', () => {
    expect(isValidEmail('email@domain.co.jp')).to.be.true;
  });

  it('Should validate: firstname-lastname@domain.com', () => {
    expect(isValidEmail('firstname-lastname@domain.com')).to.be.true;
  });

  it('Should not validate empty argument', () => {
    expect(isValidEmail()).to.be.false;
  });

  it('Should not validate: plainaddress', () => {
    expect(isValidEmail('plainaddress')).to.be.false;
  });

  it('Should not validate: #@%^%#$@#$@#.com', () => {
    expect(isValidEmail('#@%^%#$@#$@#.com')).to.be.false;
  });

  it('Should not validate: @domain.com', () => {
    expect(isValidEmail('@domain.com')).to.be.false;
  });

  it('Should not validate: Joe Smith <email@domain.com>', () => {
    expect(isValidEmail('Joe Smith <email@domain.com>')).to.be.false;
  });

  it('Should not validate: email.domain.com', () => {
    expect(isValidEmail('email.domain.com')).to.be.false;
  });

  it('Should not validate: email@domain@domain.com', () => {
    expect(isValidEmail('email@domain@domain.com')).to.be.false;
  });

  it('Should not validate: .email@domain.com', () => {
    expect(isValidEmail('.email@domain.com')).to.be.false;
  });

  it('Should not validate: email.@domain.com', () => {
    expect(isValidEmail('email.@domain.com')).to.be.false;
  });

  it('Should not validate: email..email@domain.com', () => {
    expect(isValidEmail('email..email@domain.com')).to.be.false;
  });

  it('Should not validate: email@domain.com (Joe Smith)', () => {
    expect(isValidEmail('email@domain.com (Joe Smith)')).to.be.false;
  });

  it('Should not validate: email@domain', () => {
    expect(isValidEmail('email@domain')).to.be.false;
  });

  it('Should not validate: email@111.222.333.44444', () => {
    expect(isValidEmail('email@111.222.333.44444')).to.be.false;
  });

  it('Should not validate: email@domain..com', () => {
    expect(isValidEmail('email@domain..com')).to.be.false;
  });
});
