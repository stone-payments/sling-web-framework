import { expect } from 'chai';
import { toCamelCase } from './toCamelCase.js';

describe('toCamelCase', () => {
  it('Should not convert camelCase', () => {
    expect(toCamelCase('camelCase')).to.equal('camelCase');
  });

  it('Should convert PascalCase to camelCase', () => {
    expect(toCamelCase('PascalCase')).to.equal('pascalCase');
  });

  it('Should convert Title Case to camelCase', () => {
    expect(toCamelCase('Title Case')).to.equal('titleCase');
  });

  it('Should convert snake-case to camelCase', () => {
    expect(toCamelCase('snake-case')).to.equal('snakeCase');
  });

  it('Should convert CONSTANT_CASE to camelCase', () => {
    expect(toCamelCase('CONSTANT_CASE')).to.equal('constantCase');
  });
});
