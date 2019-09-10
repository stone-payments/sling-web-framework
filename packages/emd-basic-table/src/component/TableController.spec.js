import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import faker from 'faker';
import { TableController } from './TableController.js';

import {
  DEFAULT_STYLE,
  DEFAULT_HEADER_STYLE,
  CELL_ONLY
} from '../constants/style.js';

chai.use(sinonChai);
const { expect } = chai;

let Dummy;
let dummy;

describe('TableController', () => {
  beforeEach(() => {
    Dummy = class extends TableController() {};
    dummy = new Dummy();
  });

  afterEach(() => {
    Dummy = undefined;
    dummy = undefined;
  });

  describe('.properties', () => {
    it('Should have correct keys', () => {
      expect(Dummy.properties).to.have.keys(
        'rows',
        'adapter',
        'adapters',
        'useadapter',
        'style',
        'styles',
        'usestyle',
        'titles',
        'headeradapter',
        'headerstyle',
        'clickablerows',
        'expandedbody',
        'view'
      );
    });
  });

  describe('#style', () => {
    it('Should also set styles and usestyle when style is set', () => {
      dummy.requestUpdate = sinon.spy();
      dummy.style = { textAlign: 'center' };

      expect(dummy.styles).to.deep.equal({
        default: dummy.style
      });

      expect(dummy.usestyle).to.equal('default');
    });

    it('Should call requestUpdate with previous style', () => {
      dummy.requestUpdate = sinon.spy();
      const firstStyle = { textAlign: 'center' };
      const secondStyle = { textAlign: 'right' };

      dummy.style = firstStyle;
      dummy.style = secondStyle;

      expect(dummy.requestUpdate.lastCall.args)
        .to.deep.equal(['style', firstStyle]);
    });
  });

  describe('#adapter', () => {
    it('Should also set adapters and useadapter when adapter is set', () => {
      dummy.requestUpdate = sinon.spy();
      dummy.adapter = () => {};

      expect(dummy.adapters).to.deep.equal({
        default: dummy.adapter
      });

      expect(dummy.useadapter).to.equal('default');
    });

    it('Should call requestUpdate with previous adapter', () => {
      dummy.requestUpdate = sinon.spy();
      const firstAdapter = ({ text }) => [text];
      const secondAdapter = ({ text }, index) => [index + text];

      dummy.adapter = firstAdapter;
      dummy.adapter = secondAdapter;

      expect(dummy.requestUpdate.lastCall.args)
        .to.deep.equal(['adapter', firstAdapter]);
    });
  });

  describe('#wrappedTitles', () => {
    it('Should wrap the original titles property in an array', () => {
      const titles = faker.random.word();
      dummy.titles = [titles];
      expect(dummy.wrappedTitles).to.deep.equal([[titles]]);
    });

    it('Should return an empty array if titles is unset', () => {
      expect(dummy.wrappedTitles).to.deep.equal([]);
    });
  });

  describe('#getHeaderAdapter()', () => {
    it('Should return the header adapter if defined', () => {
      dummy.headeradapter = sinon.spy();
      expect(dummy.getHeaderAdapter()).to.equal(dummy.headeradapter);
    });

    it('Should return a function that returns its first argument ' +
      'if the header adapter is not defined', () => {
      const sameFn = dummy.getHeaderAdapter();
      const arg = {};
      expect(sameFn(arg)).to.equal(arg);
    });
  });

  describe('#stringifyHeaderStyle()', () => {
    it('Should create a style string for the header\'s <th>s', () => {
      const expendedStyleObject = {};
      const resultingStyle = 'text-align: center;';

      Dummy.expandStyle = sinon.stub().returns(expendedStyleObject);
      Dummy.stringifyExpandedStyle = sinon.stub().returns(resultingStyle);

      const result = dummy.stringifyHeaderStyle(4);

      expect(Dummy.expandStyle)
        .to.have.been.calledOnceWith(
          dummy.headerstyle,
          DEFAULT_HEADER_STYLE,
          4,
          { exclude: CELL_ONLY }
        );

      expect(Dummy.stringifyExpandedStyle)
        .to.have.been.calledOnceWith(expendedStyleObject, 4);

      expect(result).to.equal(resultingStyle);
    });
  });

  describe('#stringifyHeaderCellStyle()', () => {
    it('Should create a style string for the header\'s <span>s', () => {
      const expendedStyleObject = {};
      const resultingStyle = 'text-align: center;';

      Dummy.expandStyle = sinon.stub().returns(expendedStyleObject);
      Dummy.stringifyExpandedStyle = sinon.stub().returns(resultingStyle);

      const result = dummy.stringifyHeaderCellStyle(4);

      expect(Dummy.expandStyle)
        .to.have.been.calledOnceWith(
          dummy.headerstyle,
          DEFAULT_HEADER_STYLE,
          4,
          { only: CELL_ONLY }
        );

      expect(Dummy.stringifyExpandedStyle)
        .to.have.been.calledOnceWith(expendedStyleObject, 4);

      expect(result).to.equal(resultingStyle);
    });
  });

  describe('#_getCurrent()', () => {
    let subject;

    beforeEach(() => {
      subject = { odd: {}, even: {} };
    });

    afterEach(() => {
      subject = undefined;
    });

    it('Should get the current adapter or style ' +
      'if the subjectGetter is a function', () => {
      const subjectKeyGetter = sinon.stub().returns('odd');
      const result = Dummy._getCurrent(2, 4, subject, subjectKeyGetter);
      expect(subjectKeyGetter).to.have.been.calledOnceWith(2, 4);
      expect(result).to.equal(subject.odd);
    });

    it('Should get the current adapter or style ' +
      'if the subjectGetter is a string', () => {
      const subjectKeyGetter = 'odd';
      const result = Dummy._getCurrent(2, 4, subject, subjectKeyGetter);
      expect(result).to.equal(subject.odd);
    });

    it('Should get the first adapter or style if the ' +
      'subjectGetter is neither a string nor a function', () => {
      const result = Dummy._getCurrent(2, 4, subject);
      expect(result).to.equal(subject.odd);
    });

    it('Should return undefined if the subject is not and object', () => {
      const result = Dummy._getCurrent();
      expect(result).to.be.undefined;
    });

    it('Should return undefined if the subjectKeyGetter returns ' +
      'a property that is not in the subject', () => {
      const subjectKeyGetter = 'bogus';
      const result = Dummy._getCurrent(2, 4, subject, subjectKeyGetter);
      expect(result).to.be.undefined;
    });
  });

  describe('#getRowAdapter()', () => {
    it('Should return the adapter for the row using _getCurrent', () => {
      const adapter = () => {};

      dummy.adapters = {};
      dummy.useadapter = () => {};
      Dummy._getCurrent = sinon.stub().returns(adapter);

      const result = dummy.getRowAdapter(2, 4);

      expect(Dummy._getCurrent).to.have.been.calledOnceWith(2, 4,
        dummy.adapters, dummy.useadapter);

      expect(result).to.equal(adapter);
    });

    it('Should return Object.values if _getCurrent returns undefined', () => {
      dummy.adapters = {};
      dummy.useadapter = () => {};
      Dummy._getCurrent = sinon.stub().returns(undefined);

      const result = dummy.getRowAdapter(2, 4);

      expect(Dummy._getCurrent).to.have.been.calledOnceWith(2, 4,
        dummy.adapters, dummy.useadapter);

      expect(result).to.equal(Object.values);
    });
  });

  describe('#stringifyRowStyle()', () => {
    it('Should create a style string for the row\'s <td>s', () => {
      const styleObject = {};
      const expandedStyleObject = {};
      const resultingStyle = 'text-align: center;';

      dummy.styles = {};
      dummy.usestyle = () => {};

      Dummy._getCurrent = sinon.stub().returns(styleObject);
      Dummy.expandStyle = sinon.stub().returns(expandedStyleObject);
      Dummy.stringifyExpandedStyle = sinon.stub().returns(resultingStyle);

      const result = dummy.stringifyRowStyle(2, 3, 4);

      expect(Dummy._getCurrent)
        .to.have.been.calledOnceWith(2, 3, dummy.styles, dummy.usestyle);

      expect(Dummy.expandStyle)
        .to.have.been.calledOnceWith(
          styleObject,
          DEFAULT_STYLE,
          4,
          { exclude: CELL_ONLY }
        );

      expect(Dummy.stringifyExpandedStyle)
        .to.have.been.calledOnceWith(expandedStyleObject, 4);

      expect(result).to.equal(resultingStyle);
    });
  });

  describe('#stringifyRowCellStyle()', () => {
    it('Should create a style string for the row\'s <td>s', () => {
      const styleObject = {};
      const expandedStyleObject = {};
      const resultingStyle = 'text-align: center;';

      dummy.styles = {};
      dummy.usestyle = () => {};

      Dummy._getCurrent = sinon.stub().returns(styleObject);
      Dummy.expandStyle = sinon.stub().returns(expandedStyleObject);
      Dummy.stringifyExpandedStyle = sinon.stub().returns(resultingStyle);

      const result = dummy.stringifyRowCellStyle(2, 3, 4);

      expect(Dummy._getCurrent)
        .to.have.been.calledOnceWith(2, 3, dummy.styles, dummy.usestyle);

      expect(Dummy.expandStyle)
        .to.have.been.calledOnceWith(
          styleObject,
          DEFAULT_STYLE,
          4,
          { only: CELL_ONLY }
        );

      expect(Dummy.stringifyExpandedStyle)
        .to.have.been.calledOnceWith(expandedStyleObject, 4);

      expect(result).to.equal(resultingStyle);
    });
  });

  describe('#handleRowClick()', () => {
    it('Should return a function', () => {
      expect(dummy.handleRowClick()).to.be.a('function');
    });

    it('Should dispatch a rowclick event if rows are clickable', () => {
      const index = 0;
      const firstRow = {};
      dummy.rows = [firstRow];

      dummy.clickablerows = true;
      dummy.dispatchEventAndMethod = sinon.spy();
      dummy.handleRowClick(index)();

      expect(dummy.dispatchEventAndMethod)
        .to.have.been.calledOnceWith('rowclick', firstRow);
    });

    it('Should not dispatch an event if rows are not clickable', () => {
      const index = 0;
      const firstRow = {};
      dummy.rows = [firstRow];

      dummy.clickablerows = false;
      dummy.dispatchEventAndMethod = sinon.spy();
      dummy.handleRowClick(index)();

      expect(dummy.dispatchEventAndMethod).not.to.have.been.called;
    });
  });

  describe('#dispatchCustomEvent()', () => {
    it('Should return a function', () => {
      expect(dummy.dispatchCustomEvent()).to.be.a('function');
    });

    it('Should dispatch a custom event given a name', () => {
      const index = 0;
      const firstRow = {};
      dummy.rows = [firstRow];

      dummy.dispatchEventAndMethod = sinon.spy();
      dummy.dispatchCustomEvent(index)('custom')();

      expect(dummy.dispatchEventAndMethod)
        .to.have.been.calledOnceWith('custom', firstRow);
    });
  });

  describe('#render()', () => {
    it('Should call currentView.apply', () => {
      dummy.currentView = { apply: sinon.spy() };
      dummy.render();
      expect(dummy.currentView.apply).to.have.been.calledOnceWith(dummy);
    });
  });
});
