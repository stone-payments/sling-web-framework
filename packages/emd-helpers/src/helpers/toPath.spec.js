import { expect } from 'chai';
import { toPath } from './toPath.js';

describe('toPath', () => {
  it('Should convert a path to an array', () => {
    const pathStr = 'world.in.my.eyes';
    expect(toPath(pathStr)).to.deep.equal(['world', 'in', 'my', 'eyes']);
  });

  it('Should treat numeric values as array indexes', () => {
    const pathStr = 'revolution[909]';
    expect(toPath(pathStr)).to.deep.equal(['revolution', 909]);
  });

  it('Should handle a single string', () => {
    const pathStr = 'world';
    expect(toPath(pathStr)).to.deep.equal(['world']);
  });

  it('Should handle a single numeric value', () => {
    const pathStr = '[909]';
    expect(toPath(pathStr)).to.deep.equal([909]);
  });

  it('Should handle many numeric values', () => {
    const pathStr = '[909][303]';
    expect(toPath(pathStr)).to.deep.equal([909, 303]);
  });

  it('Should not break with an empty array', () => {
    const pathStr = '';
    expect(toPath(pathStr)).to.deep.equal([]);
  });
});
