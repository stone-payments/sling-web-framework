import { expect } from 'chai';
import { fromPath } from './fromPath.js';

describe('fromPath', () => {
  it('Should return a path from an array', () => {
    const pathArr = ['world', 'in', 'my', 'eyes'];
    expect(fromPath(pathArr)).to.equal('world.in.my.eyes');
  });

  it('Should treat numeric values as array indexes', () => {
    const pathArr = ['revolution', 909];
    expect(fromPath(pathArr)).to.equal('revolution[909]');
  });

  it('Should handle a single string', () => {
    const pathArr = ['world'];
    expect(fromPath(pathArr)).to.equal('world');
  });

  it('Should handle a single numeric value', () => {
    const pathArr = [909];
    expect(fromPath(pathArr)).to.equal('[909]');
  });

  it('Should handle many numeric values', () => {
    const pathArr = [909, 303];
    expect(fromPath(pathArr)).to.equal('[909][303]');
  });

  it('Should not break with an empty array', () => {
    const pathArr = [];
    expect(fromPath(pathArr)).to.equal('');
  });
});
