import { expect } from 'chai';
import { toTitleCase } from './toTitleCase.js';

describe('toTitleCase', () => {
  it('Should not convert Title Case', () => {
    expect(toTitleCase('Title Case')).to.equal('Title Case');
  });

  it('Should convert camelCase to Title Case', () => {
    expect(toTitleCase('camelCase')).to.equal('Camel Case');
  });

  it('Should convert PascalCase to Title Case', () => {
    expect(toTitleCase('PascalCase')).to.equal('Pascal Case');
  });

  it('Should convert snake-case to Title Case', () => {
    expect(toTitleCase('snake-case')).to.equal('Snake Case');
  });

  it('Should convert CONSTANT_CASE to Title Case', () => {
    expect(toTitleCase('CONSTANT_CASE')).to.equal('Constant Case');
  });
});
