import chai from 'chai';
import { isValidEmail } from './isValidEmail.js';

const { expect } = chai;

describe('isValidEmail', () => {
  it('Should not validate “me@”.', () => {
    expect(isValidEmail('me@')).to.equal(false);
  });

  it('Should not validate “@example.com”.', () => {
    expect(isValidEmail('@example.com')).to.equal(false);
  });

  it('Should not validate “me.@example.com”.', () => {
    expect(isValidEmail('me.@example.com')).to.equal(false);
  });

  it('Should not validate “.me@example.com”.', () => {
    expect(isValidEmail('.me@example.com')).to.equal(false);
  });

  it('Should not validate “me@example..com”.', () => {
    expect(isValidEmail('me@example..com')).to.equal(false);
  });

  it('Should not validate “me.example@com”.', () => {
    expect(isValidEmail('me.example@com')).to.equal(false);
  });

  it('Should not validate “plainaddress”.', () => {
    expect(isValidEmail('plainaddress')).to.equal(false);
  });

  it('Should not validate “#@%^%#$@#$@#.com”.', () => {
    expect(isValidEmail('#@%^%#$@#$@#.com')).to.equal(false);
  });

  it('Should not validate “@domain.com”.', () => {
    expect(isValidEmail('@domain.com')).to.equal(false);
  });

  it('Should not validate “Joe Smith <email@domain.com>”.', () => {
    expect(isValidEmail('Joe Smith <email@domain.com>')).to.equal(false);
  });

  it('Should not validate “email.domain.com”.', () => {
    expect(isValidEmail('email.domain.com')).to.equal(false);
  });

  it('Should not validate “email@domain@domain.com”.', () => {
    expect(isValidEmail('email@domain@domain.com')).to.equal(false);
  });

  it('Should not validate “.email@domain.com”.', () => {
    expect(isValidEmail('.email@domain.com')).to.equal(false);
  });

  it('Should not validate “email.@domain.com”.', () => {
    expect(isValidEmail('email.@domain.com')).to.equal(false);
  });

  it('Should not validate “email..email@domain.com”.', () => {
    expect(isValidEmail('email..email@domain.com')).to.equal(false);
  });

  it('Should not validate “email@domain.com (Joe Smith)”.', () => {
    expect(isValidEmail('email@domain.com (Joe Smith)')).to.equal(false);
  });

  it('Should not validate “email@domain”.', () => {
    expect(isValidEmail('email@domain')).to.equal(false);
  });

  it('Should not validate “email@111.222.333.44444”.', () => {
    expect(isValidEmail('email@111.222.333.44444')).to.equal(false);
  });

  it('Should not validate “email@domain..com”.', () => {
    expect(isValidEmail('email@domain..com')).to.equal(false);
  });

  it('Should validate “email@domain.com”.', () => {
    expect(isValidEmail('email@domain.com')).to.equal(true);
  });

  it('Should validate “firstname.lastname@domain.com”.', () => {
    expect(isValidEmail('firstname.lastname@domain.com')).to.equal(true);
  });

  it('Should validate “email@subdomain.domain.com”.', () => {
    expect(isValidEmail('email@subdomain.domain.com')).to.equal(true);
  });

  it('Should validate “firstname+lastname@domain.com”.', () => {
    expect(isValidEmail('firstname+lastname@domain.com')).to.equal(true);
  });

  it('Should validate “email@[123.123.123.123]”.', () => {
    expect(isValidEmail('email@[123.123.123.123]')).to.equal(true);
  });

  it('Should validate “"email"@domain.com”.', () => {
    expect(isValidEmail('"email"@domain.com')).to.equal(true);
  });

  it('Should validate “1234567890@domain.com”.', () => {
    expect(isValidEmail('1234567890@domain.com')).to.equal(true);
  });

  it('Should validate “email@domain-one.com”.', () => {
    expect(isValidEmail('email@domain-one.com')).to.equal(true);
  });

  it('Should validate “_______@domain.com”.', () => {
    expect(isValidEmail('_______@domain.com')).to.equal(true);
  });

  it('Should validate “email@domain.name”.', () => {
    expect(isValidEmail('email@domain.name')).to.equal(true);
  });

  it('Should validate “email@domain.co.jp”.', () => {
    expect(isValidEmail('email@domain.co.jp')).to.equal(true);
  });

  it('Should validate “firstname-lastname@domain.com”.', () => {
    expect(isValidEmail('firstname-lastname@domain.com')).to.equal(true);
  });

  it('Should validate “me@example.com”.', () => {
    expect(isValidEmail('me@example.com')).to.equal(true);
  });

  it('Should validate “a.nonymous@example.com”.', () => {
    expect(isValidEmail('a.nonymous@example.com')).to.equal(true);
  });

  it('Should validate “name+tag@example.com”.', () => {
    expect(isValidEmail('name+tag@example.com')).to.equal(true);
  });

  it('Should validate “"spaces may be quoted"@example.com”.', () => {
    expect(isValidEmail('"spaces may be quoted"@example.com')).to.equal(true);
  });

  it("Should validate “!#$%&'*+-/=.?^_`{|}~@[1.0.0.127]”", () => {
    expect(isValidEmail("!#$%&'*+-/=.?^_`{|}~@[1.0.0.127]")).to.equal(true);
  });
});
