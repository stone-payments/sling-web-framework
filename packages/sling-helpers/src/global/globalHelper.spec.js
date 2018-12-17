import chai from 'chai';

import {
  isString,
  isFunction,
  isPromise,
  createRangeArray,
  isDateRange,
  toFlatArray,
  toFlatArrayDeep,
  toFlatObject,
  toFlatEntries,
  pickBy,
  parsePath,
  get,
  set,
  groupByDeep,
  mapByKey,
  getDateRangeArray,
  isDeeplyEmpty,
} from './globalHelper.js';

const { expect } = chai;
describe('isString', () => {
  it('Should return true for a string.', () => {
    expect(isString('a')).to.equal(true);
  });

  it('Should return true for a string made with new String().', () => {
    const testStr = new String('a');
    expect(isString(testStr)).to.equal(true);
    expect(typeof testStr).to.equal('object');
  });

  it('Should return false for an object.', () => {
    expect(isString({})).to.equal(false);
  });

  it('Should return false for an array.', () => {
    expect(isString([])).to.equal(false);
  });

  it('Should return false for a number.', () => {
    expect(isString(2)).to.equal(false);
  });

  it('Should return false for null.', () => {
    expect(isString(null)).to.equal(false);
  });

  it('Should return false for undefined.', () => {
    expect(isString(undefined)).to.equal(false);
  });

  it('Should return false for a function.', () => {
    expect(isString(() => 'a')).to.equal(false);
  });

  it('Should return false for a Promise.', () => {
    const testPromise = Promise.resolve('a');
    expect(isString(testPromise)).to.equal(false);
  });
});

describe('isFunction', () => {
  it('Should return false for a string.', () => {
    expect(isFunction('a')).to.equal(false);
  });

  it('Should return false for an object.', () => {
    expect(isFunction({})).to.equal(false);
  });

  it('Should return false for an array.', () => {
    expect(isFunction([])).to.equal(false);
  });

  it('Should return false for a number.', () => {
    expect(isFunction(2)).to.equal(false);
  });

  it('Should return false for null.', () => {
    expect(isFunction(null)).to.equal(false);
  });

  it('Should return false for undefined.', () => {
    expect(isFunction(undefined)).to.equal(false);
  });

  it('Should return true for a function.', () => {
    expect(isFunction(() => 'a')).to.equal(true);
  });

  it('Should return false for a Promise.', () => {
    const testPromise = Promise.resolve('a');
    expect(isFunction(testPromise)).to.equal(false);
  });
});

describe('isPromise', () => {
  it('Should return false for a string.', () => {
    expect(isPromise('a')).to.equal(false);
  });

  it('Should return false for an object.', () => {
    expect(isPromise({})).to.equal(false);
  });

  it('Should return false for an array.', () => {
    expect(isPromise([])).to.equal(false);
  });

  it('Should return false for a number.', () => {
    expect(isPromise(2)).to.equal(false);
  });

  it('Should return false for null.', () => {
    expect(isPromise(null)).to.equal(false);
  });

  it('Should return false for undefined.', () => {
    expect(isPromise(undefined)).to.equal(false);
  });

  it('Should return false for a function.', () => {
    expect(isPromise(() => 'a')).to.equal(false);
  });

  it('Should return true for a Promise.', () => {
    const testPromise = Promise.resolve('a');
    expect(isPromise(testPromise)).to.equal(true);
  });
});

describe('createRangeArray', () => {
  it('Should create an array of numbers given a start and an end.', () => {
    expect(createRangeArray(1, 5)).to.eql([1, 2, 3, 4, 5]);
  });

  it('Should create an array of a single integer if passed '
    + 'only the start parameter is passed.', () => {
    expect(createRangeArray(5)).to.eql([5]);
  });

  it('Should throw an error if parameters are not integers.', () => {
    expect(() => createRangeArray(1.1, 5.5)).to.throw();
  });

  it('Should throw an error if the end is smaller than the start.', () => {
    expect(() => createRangeArray(5, 1)).to.throw();
  });
});

describe('isDateRange', () => {
  it('Should return true if final date is bigger than start date', () => {
    expect(isDateRange('2012-01-01', '2012-01-02')).to.equal(true);
  });

  it('Should return false if final date is not bigger than start date', () => {
    expect(isDateRange('2012-01-01', '2012-01-01')).to.equal(false);
  });
});

describe('toFlatArray', () => {
  it('Should flatten an array of arrays in order.', () => {
    const flattenedArray = [[1], [2, 3], [4]].reduce(toFlatArray, []);
    expect(flattenedArray).to.eql([1, 2, 3, 4]);
  });

  it('Should not flatten more than one level deep.', () => {
    const flattenedArray = [[1], [2, [3]], [4]].reduce(toFlatArray, []);
    expect(flattenedArray).to.eql([1, 2, [3], 4]);
  });

  it('Should handle items that are not arrays.', () => {
    const flattenedArray = [1, [2], 3, 4].reduce(toFlatArrayDeep, []);
    expect(flattenedArray).to.eql([1, 2, 3, 4]);
  });
});

describe('toFlatArrayDeep', () => {
  it('Should flatten an array of arrays in order.', () => {
    const flattenedArray = [[1], [2, 3], [4]].reduce(toFlatArrayDeep, []);
    expect(flattenedArray).to.eql([1, 2, 3, 4]);
  });

  it('Should flatten more than one level deep.', () => {
    const flattenedArray = [[1], [2, [3]], [4]].reduce(toFlatArrayDeep, []);
    expect(flattenedArray).to.eql([1, 2, 3, 4]);
  });

  it('Should flatten really nested array.', () => {
    const flattenedArray = [[[1], [2, [3]]], [[4]], 5]
      .reduce(toFlatArrayDeep, []);
    expect(flattenedArray).to.eql([1, 2, 3, 4, 5]);
  });

  it('Should handle items that are not arrays.', () => {
    const flattenedArray = [1, [2], 3, 4].reduce(toFlatArrayDeep, []);
    expect(flattenedArray).to.eql([1, 2, 3, 4]);
  });
});

describe('toFlatObject', () => {
  it('Should flatten an array of objects.', () => {
    const flattenedObject = [
      { a: 1 },
      { b: 3 },
      { a: 5, c: 6 },
    ].reduce(toFlatObject, {});

    expect(flattenedObject).to.eql({
      a: 5,
      b: 3,
      c: 6,
    });
  });
});

describe('toFlatEntries', () => {
  it('Should flatten an array of object entries.', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };

    const flattenedEntries = Object
      .entries(obj)
      .reduce(toFlatEntries, {});

    expect(flattenedEntries).to.eql({
      a: 1,
      b: 2,
      c: 3,
    });
  });
});

describe('pickBy', () => {
  it('Should filter object entries given a helper function', () => {
    const object = { a: '1', b: 2, c: '3' };
    const expected = { a: '1', c: '3' };
    const actual = pickBy(object, isString);

    expect(expected).to.eql(actual);
  });
  it('Should filter object entries given a callback function.', () => {
    const object = { a: 5, b: 3, c: 6 };
    const expected = { a: 5, c: 6 };
    const actual = pickBy(object, value => value > 3);

    expect(expected).to.eql(actual);
  });
});

describe('parsePath', () => {
  it('Should wrap a single object key in an array.', () => {
    expect(parsePath('a')).to.eql(['a']);
  });

  it('Should wrap the contents inside brackets in an array.', () => {
    expect(parsePath('[0]')).to.eql(['0']);
  });

  it('Should break an object path into an array of keys ' +
    'using dot syntax.', () => {
    expect(parsePath('a.b')).to.eql(['a', 'b']);
  });

  it('Should break an object path into an array of keys ' +
    'using a key and brackets.', () => {
    expect(parsePath('a[0]')).to.eql(['a', '0']);
  });

  it('Should break an object path into an array of keys ' +
    'using a mix of dot syntax and brackets.', () => {
    expect(parsePath('a[0].b[0]')).to.eql(['a', '0', 'b', '0']);
  });

  it('Should break an object path into an array of keys ' +
    'using a key and multiple brackets.', () => {
    expect(parsePath('a[0][0]')).to.eql(['a', '0', '0']);
  });

  it('Should break an object path into an array of keys ' +
    'using brackets first and then dot syntax.', () => {
    expect(parsePath('[0].b')).to.eql(['0', 'b']);
  });
});

describe('get', () => {
  it('Should get the value inside and object passing ' +
    'a key as a string.', () => {
    const test = { a: 10 };
    expect(get(test, 'a')).to.eql(10);
  });

  it('Should get the value inside and object passing ' +
    'brackets notation as a string.', () => {
    const test = [10];
    expect(get(test, '[0]')).to.eql(10);
  });

  it('Should get the value inside and object passing ' +
    'a path in dot syntax.', () => {
    const test = { a: { b: 15 } };
    expect(get(test, 'a.b')).to.eql(15);
  });

  it('Should get the value inside and object passing ' +
    'a path with a key and brackets.', () => {
    const test = { a: [25] };
    expect(get(test, 'a[0]')).to.eql(25);
  });

  it('Should get the value inside and object passing ' +
    'a path with dot syntax and brackets.', () => {
    const test = { a: [{ b: [30] }] };
    expect(get(test, 'a[0].b[0]')).to.eql(30);
  });

  it('Should get the value inside and object passing ' +
    'a path with a key and multiple brackets.', () => {
    const test = { a: [[35]] };
    expect(get(test, 'a[0][0]')).to.eql(35);
  });

  it('Should get the value inside and object passing ' +
    'a path starting with brackets and then dot syntax.', () => {
    const test = [{ b: 40 }];
    expect(get(test, '[0].b')).to.eql(40);
  });
});

describe('set', () => {
  it('Should set the value inside and object passing ' +
    'a key as a string.', () => {
    const test = { a: 10 };
    expect(set(test, 'a', 10)).to.eql(test);
  });

  it('Should set the value inside and object passing ' +
    'a path in dot syntax.', () => {
    const test = { a: { b: 15 } };
    expect(set(test, 'a.b', 15)).to.eql(test);
  });
});

describe('groupByDeep', () => {
  const stores = [{
    name: 'Iguatemi',
    city: 'Campinas',
    state: 'SP',
  }, {
    name: 'Jardins',
    city: 'São Paulo',
    state: 'SP',
  }, {
    name: 'Iguatemi',
    city: 'São Paulo',
    state: 'SP',
  }, {
    name: 'Pedras',
    city: 'Búzios',
    state: 'RJ',
  }, {
    name: 'Ipanema',
    city: 'Rio de Janeiro',
    state: 'RJ',
  }, {
    name: 'Leblon',
    city: 'Rio de Janeiro',
    state: 'RJ',
  }, {
    name: 'ParkShopping',
    city: 'Brasília',
    state: 'DF',
  }];

  const getNamesFirstCharacter = item => item.name.slice(0, 1);
  const getCityName = item => item.city;
  const getStateName = item => item.state;
  const getData = item => item.data;

  it('Should group stores by the first letter of their names.', () => {
    expect(groupByDeep(stores, getNamesFirstCharacter)).to.eql({
      I: [{
        name: 'Iguatemi',
        city: 'Campinas',
        state: 'SP',
      }, {
        name: 'Iguatemi',
        city: 'São Paulo',
        state: 'SP',
      }, {
        name: 'Ipanema',
        city: 'Rio de Janeiro',
        state: 'RJ',
      }],
      J: [{
        name: 'Jardins',
        city: 'São Paulo',
        state: 'SP',
      }],
      P: [{
        name: 'Pedras',
        city: 'Búzios',
        state: 'RJ',
      }, {
        name: 'ParkShopping',
        city: 'Brasília',
        state: 'DF',
      }],
      L: [{
        name: 'Leblon',
        city: 'Rio de Janeiro',
        state: 'RJ',
      }],
    });
  });

  it('Should group stores by state and city.', () => {
    expect(groupByDeep(stores, getStateName, getCityName)).to.eql({
      SP: {
        Campinas: [{
          name: 'Iguatemi',
          city: 'Campinas',
          state: 'SP',
        }],
        'São Paulo': [{
          name: 'Jardins',
          city: 'São Paulo',
          state: 'SP',
        }, {
          name: 'Iguatemi',
          city: 'São Paulo',
          state: 'SP',
        }],
      },
      RJ: {
        Búzios: [{
          name: 'Pedras',
          city: 'Búzios',
          state: 'RJ',
        }],
        'Rio de Janeiro': [{
          name: 'Ipanema',
          city: 'Rio de Janeiro',
          state: 'RJ',
        }, {
          name: 'Leblon',
          city: 'Rio de Janeiro',
          state: 'RJ',
        }],
      },
      DF: {
        Brasília: [{
          name: 'ParkShopping',
          city: 'Brasília',
          state: 'DF',
        }],
      },
    });
  });

  it('Should group stores by the first letter of their names and ' +
    'the name of the city.', () => {
    expect(groupByDeep(stores, getNamesFirstCharacter, getCityName))
      .to.eql({
        I: {
          Campinas: [{
            name: 'Iguatemi',
            city: 'Campinas',
            state: 'SP',
          }],
          'São Paulo': [{
            name: 'Iguatemi',
            city: 'São Paulo',
            state: 'SP',
          }],
          'Rio de Janeiro': [{
            name: 'Ipanema',
            city: 'Rio de Janeiro',
            state: 'RJ',
          }],
        },
        J: {
          'São Paulo': [{
            name: 'Jardins',
            city: 'São Paulo',
            state: 'SP',
          }],
        },
        P: {
          Búzios: [{
            name: 'Pedras',
            city: 'Búzios',
            state: 'RJ',
          }],
          Brasília: [{
            name: 'ParkShopping',
            city: 'Brasília',
            state: 'DF',
          }],
        },
        L: {
          'Rio de Janeiro': [{
            name: 'Leblon',
            city: 'Rio de Janeiro',
            state: 'RJ',
          }],
        },
      });
  });

  it('Should handle an undefined collection.', () => {
    expect(groupByDeep(undefined, getData)).to.eql({});
  });
});

describe('mapByKey', () => {
  it('Should create a map with correct keys and values', () => {
    const test = [
      { cool_name: 'abc', cool_value: 10 },
      { cool_name: 'def', cool_value: 20 },
    ];
    const expected = {
      abc: 10,
      def: 20,
    };
    expect(mapByKey(test, 'cool_name', 'cool_value')).to.eql(expected);
  });

  describe('getDateRangeArray', () => {
    it('should return array of days in YYYY-MM-DD for a date range', () => {
      expect(getDateRangeArray('2018-01-31', '2018-02-04', 'YYYY-MM-DD'))
        .to.deep.equal([
          '2018-01-31',
          '2018-02-01',
          '2018-02-02',
          '2018-02-03',
          '2018-02-04',
        ]);
    });

    it('should return array of days in DD/MM for a date range', () => {
      expect(getDateRangeArray('2018-01-31', '2018-02-04', 'DD/MM'))
        .to.deep.equal([
          '31/01',
          '01/02',
          '02/02',
          '03/02',
          '04/02',
        ]);
    });
  });
});

describe('isDeeplyEmpty', () => {
  it('Should return true for empty properties', () => {
    const test = { a: null, b: undefined, c: [], d: [null, undefined] };
    chai.assert.isTrue(isDeeplyEmpty(test));
  });

  it('Should return false for empty properties', () => {
    const test = { a: null, b: undefined, c: [], d: ['testString', undefined] };
    chai.assert.isFalse(isDeeplyEmpty(test));
  });
});
