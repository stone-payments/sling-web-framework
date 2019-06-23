import { expect } from 'chai';
import { byProp } from './byProp.js';

describe('byProp', () => {
  it('Should return a function', () => {
    expect(byProp()).to.be.a('function');
  });

  it('Should return true if a value matches an object property', () => {
    const obj = { a: 3, b: 5 };
    expect(byProp('a', 3)(obj)).to.be.true;
  });

  it('Should be usable with Array.filter', () => {
    const songs = [
      { band: 'Nirvana', song: 'Smells Like Teen Spirit' },
      { band: 'Foo Fighters', song: 'Learn to Fly' }
    ];
    expect(songs.filter(byProp('band', 'Nirvana')))
      .to.deep.equal([{ band: 'Nirvana', song: 'Smells Like Teen Spirit' }]);
  });

  it('Should be usable with Array.find', () => {
    const songs = [
      { band: 'Nirvana', song: 'Smells Like Teen Spirit' },
      { band: 'Foo Fighters', song: 'Learn to Fly' }
    ];
    expect(songs.find(byProp('band', 'Nirvana')))
      .to.deep.equal({ band: 'Nirvana', song: 'Smells Like Teen Spirit' });
  });
});
