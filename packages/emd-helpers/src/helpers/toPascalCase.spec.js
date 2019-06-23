import { expect } from 'chai';
import { toPascalCase } from './toPascalCase.js';

describe('toPascalCase', () => {
  it('Should not convert PascalCase', () => {
    expect(toPascalCase('PascalCase')).to.equal('PascalCase');
  });

  it('Should convert camelCase to Title Case', () => {
    expect(toPascalCase('camelCase')).to.equal('CamelCase');
  });

  it('Should convert Title Case to PascalCase', () => {
    expect(toPascalCase('Title Case')).to.equal('TitleCase');
  });

  it('Should convert snake-case to Title Case', () => {
    expect(toPascalCase('snake-case')).to.equal('SnakeCase');
  });

  it('Should convert CONSTANT_CASE to Title Case', () => {
    expect(toPascalCase('CONSTANT_CASE')).to.equal('ConstantCase');
  });
});
