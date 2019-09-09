import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { TableController } from './TableController.js';

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
});
