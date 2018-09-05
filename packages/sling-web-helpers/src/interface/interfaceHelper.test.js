import {
  NULLABLE,
  nullable,
  ARRAY_OF,
  arrayOf,
  matchesInterface,
  matchesInterfacePartially,
} from './interfaceHelper.js';

const mockInterface = {
  name: String,
  age: Number,
  city: nullable(String),
};

let payload;

describe('nullable', () => {
  afterEach(() => {
    payload = undefined;
  });

  it('Should return a function.', () => {
    expect(nullable()).to.be.a('function');
  });

  it('Should return a function that returns an object ' +
    'with type and assertion keys.', () => {
    expect(nullable(String)()).to.eql({
      type: NULLABLE,
      assertion: String,
    });
  });
});

describe('arrayOf', () => {
  it('Should return a function.', () => {
    expect(arrayOf()).to.be.a('function');
  });

  it('Should return a function that returns an object ' +
    'with type and primitive keys.', () => {
    expect(arrayOf(String)()).to.eql({
      type: ARRAY_OF,
      primitive: String,
    });
  });

  it('Should throw and error if receives anything other ' +
    'than valid primitives.', () => {
    expect(() => arrayOf(null)()).to.throw();
  });
});

describe('matchesInterface', () => {
  it('Should throw an error if null or undefined ' +
    'are used as interface assertions.', () => {
    const bogusInterface = {
      name: String,
      age: null,
      city: String,
    };

    expect(() => matchesInterface(bogusInterface)({})).to.throw();
  });

  it('Should return true if an object matches an interface completly.', () => {
    payload = {
      name: 'Hopper',
      age: 86,
      city: 'New York',
    };

    expect(matchesInterface(mockInterface)(payload)).to.be.true;
  });

  it('Should return true if an object matches only the required parameters ' +
    'of an interface and others are undefined or null.', () => {
    payload = {
      name: 'Hopper',
      age: 86,
    };

    expect(matchesInterface(mockInterface)(payload)).to.be.true;
  });

  it('Should return false if a required parameter is not present ' +
    'in the object.', () => {
    payload = {
      name: 'Hopper',
      city: 'New York',
    };

    expect(matchesInterface(mockInterface)(payload)).to.be.false;
  });

  it('Should return false if a required parameter ' +
    'has an unexpected type.', () => {
    payload = {
      name: true,
      age: 86,
      city: 'New York',
    };

    expect(matchesInterface(mockInterface)(payload)).to.be.false;
  });

  it('Should return false if an non-required parameter ' +
    'has an unexpected type.', () => {
    payload = {
      name: 'Hooper',
      age: 86,
      city: true,
    };

    expect(matchesInterface(mockInterface)(payload)).to.be.false;
  });

  it('Should return false if the object has an unexpected parameter.', () => {
    payload = {
      name: 'Hopper',
      age: 86,
      city: 'New York',
      state: 'New York',
    };

    expect(matchesInterface(mockInterface)(payload)).to.be.false;
  });

  it('Should validate an array correctly.', () => {
    payload = { cities: ['New York'] };
    const arrayInterface = { cities: Array };

    expect(matchesInterface(arrayInterface)(payload)).to.be.true;
  });

  it('Should validate an array of Strings correctly.', () => {
    payload = { cities: ['New York'] };
    const arrayInterface = { cities: arrayOf(String) };

    expect(matchesInterface(arrayInterface)(payload)).to.be.true;
  });

  it('Should validate a nullable array of Strings correctly.', () => {
    payload = { cities: ['New York'] };
    const arrayInterface = { cities: nullable(arrayOf(String)) };

    expect(matchesInterface(arrayInterface)(payload)).to.be.true;
  });

  it('Should consider an empty array valid.', () => {
    payload = { cities: [] };
    const arrayInterface = { cities: arrayOf(String) };

    expect(matchesInterface(arrayInterface)(payload)).to.be.true;
  });

  it('Should return false if an item of the array is invalid.', () => {
    payload = { cities: ['New York', 1024] };
    const arrayInterface = { cities: arrayOf(String) };

    expect(matchesInterface(arrayInterface)(payload)).to.be.false;
  });

  it('Should throw an error if "arrayOf(nullable())" is used.', () => {
    payload = { cities: ['New York'] };
    const arrayInterface = { cities: arrayOf(nullable(String)) };

    expect(() => matchesInterface(arrayInterface)(payload)).to.throw();
  });
});

describe('matchesInterfacePartially', () => {
  it('Should return true if an object matches an interface completly.', () => {
    payload = {
      name: 'Hopper',
      age: 86,
      city: 'New York',
    };

    expect(matchesInterfacePartially(mockInterface)(payload)).to.be.true;
  });

  it('Should return true if an object matches only the required parameters ' +
    'of an interface and others are undefined.', () => {
    payload = {
      name: 'Hopper',
      age: 86,
    };

    expect(matchesInterfacePartially(mockInterface)(payload)).to.be.true;
  });

  it('Should return true even if a required parameter is not present ' +
    'in the object.', () => {
    payload = {
      name: 'Hopper',
      city: 'New York',
    };

    expect(matchesInterfacePartially(mockInterface)(payload)).to.be.true;
  });

  it('Should return false if a required parameter ' +
    'has an unexpected type.', () => {
    payload = {
      name: true,
      age: 86,
      city: 'New York',
    };

    expect(matchesInterfacePartially(mockInterface)(payload)).to.be.false;
  });

  it('Should return false if an non-required parameter ' +
    'has an unexpected type.', () => {
    payload = {
      name: 'Hooper',
      age: 86,
      city: true,
    };

    expect(matchesInterfacePartially(mockInterface)(payload)).to.be.false;
  });

  it('Should return false if the object has an unexpected parameter.', () => {
    payload = {
      name: 'Hopper',
      age: 86,
      city: 'New York',
      state: 'New York',
    };

    expect(matchesInterfacePartially(mockInterface)(payload)).to.be.false;
  });

  it('Should validate an array correctly.', () => {
    payload = { cities: ['New York'] };
    const arrayInterface = { cities: Array };

    expect(matchesInterfacePartially(arrayInterface)(payload)).to.be.true;
  });

  it('Should validate an array of Strings correctly.', () => {
    payload = { cities: ['New York'] };
    const arrayInterface = { cities: arrayOf(String) };

    expect(matchesInterfacePartially(arrayInterface)(payload)).to.be.true;
  });

  it('Should validate a nullable array of Strings correctly.', () => {
    payload = { cities: ['New York'] };
    const arrayInterface = { cities: nullable(arrayOf(String)) };

    expect(matchesInterfacePartially(arrayInterface)(payload)).to.be.true;
  });

  it('Should consider an empty array valid.', () => {
    payload = { cities: [] };
    const arrayInterface = { cities: arrayOf(String) };

    expect(matchesInterfacePartially(arrayInterface)(payload)).to.be.true;
  });

  it('Should return false if an item of the array is invalid.', () => {
    payload = { cities: ['New York', 1024] };
    const arrayInterface = { cities: arrayOf(String) };

    expect(matchesInterfacePartially(arrayInterface)(payload)).to.be.false;
  });

  it('Should throw an error if "arrayOf(nullable())" is used.', () => {
    payload = { cities: ['New York'] };
    const arrayInterface = { cities: arrayOf(nullable(String)) };

    expect(() => matchesInterfacePartially(arrayInterface)(payload)).to.throw();
  });
});
