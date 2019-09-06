import { expect } from 'chai';
import faker from 'faker';
import { withTableStyleParser } from './withTableStyleParser.js';

let Dummy;

describe('withTableStyleParser', () => {
  beforeEach(() => {
    Dummy = class extends withTableStyleParser() {};
  });

  afterEach(() => {
    Dummy = undefined;
  });

  describe('._expandValueToArray', () => {
    it('Should repeat a value in an array a given a max length', () => {
      const value = faker.random.word();

      expect(Dummy._expandValueToArray(value, 3))
        .to.deep.equal([value, value, value]);
    });
  });

  describe('._completeWithDefault', () => {
    it('Should complete an array with default values ' +
      'given a max length', () => {
      const value = faker.random.word();
      const defaultValue = faker.random.word();
      const arr = [value, value];

      expect(Dummy._completeWithDefault(arr, defaultValue, 3))
        .to.deep.equal([value, value, defaultValue]);
    });

    it('Should complete an array with null if a default value is not passed, ' +
      'given a max length', () => {
      const value = faker.random.word();
      const arr = [value, value];

      expect(Dummy._completeWithDefault(arr, undefined, 3))
        .to.deep.equal([value, value, null]);
    });

    it('Should restrict the returned array to a max length', () => {
      const value = faker.random.word();
      const arr = [value, value, value, value];

      expect(Dummy._completeWithDefault(arr, undefined, 3))
        .to.deep.equal([value, value, value]);
    });
  });

  describe('._expandStyle', () => {
    it('Should convert a single style from the short form ' +
      'to the expanded form', () => {
      const style = {
        textAlign: 'center',
        borderColor: ['#909', '#303'],
        top: ['30px', '50px']
      };

      const defaultStyle = {
        textAlign: 'left',
        borderColor: '#606'
      };

      expect(Dummy._expandStyle(style, defaultStyle, 4))
        .to.deep.equal({
          textAlign: ['center', 'center', 'center', 'center'],
          borderColor: ['#909', '#303', '#606', '#606'],
          top: ['30px', '50px', null, null]
        });
    });
  });

  describe('.expandStyles', () => {
    it('Should convert each named style of the styles object ' +
    'from the short form to the expanded form', () => {
      const styles = {
        even: {
          textAlign: 'left',
          borderColor: ['#909', '#303'],
          top: ['30px', '50px']
        },
        odd: {
          textAlign: 'right',
          borderColor: ['#222', '#333']
        }
      };

      const defaultStyle = {
        textAlign: 'left',
        borderColor: '#606'
      };

      expect(Dummy.expandStyles(styles, defaultStyle, 4))
        .to.deep.equal({
          even: {
            textAlign: ['left', 'left', 'left', 'left'],
            borderColor: ['#909', '#303', '#606', '#606'],
            top: ['30px', '50px', null, null]
          },
          odd: {
            textAlign: ['right', 'right', 'right', 'right'],
            borderColor: ['#222', '#333', '#606', '#606']
          }
        });
    });
  });

  describe('stringifyExpandedStyle', () => {
    it('Should convert a single expanded style object ' +
      'into an array of CSS style strings', () => {
      const expandedStyle = {
        textAlign: ['left', 'left', 'left', 'left'],
        borderColor: ['#909', '#303', '#606', '#606'],
        top: ['30px', '50px', null, null]
      };

      expect(Dummy.stringifyExpandedStyle(expandedStyle))
        .to.deep.equal([
          'text-align: left; border-color: #909; top: 30px;',
          'text-align: left; border-color: #303; top: 50px;',
          'text-align: left; border-color: #606;',
          'text-align: left; border-color: #606;'
        ]);
    });
  });
});
