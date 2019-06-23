import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { withIO } from './withIO.js';

chai.use(sinonChai);
const { expect } = chai;

class Dummy extends withIO() {}

describe('withIO', () => {
  describe('#constructor()', () => {
    let dummy;

    beforeEach(() => {
      dummy = new Dummy();
      dummy.dispatchEventAndMethod = sinon.spy();
    });

    afterEach(() => {
      dummy = null;
    });

    it('Should correctly access the input getter', () => {
      dummy.input = 'str';
      expect(dummy.input).to.equal('str');
    });

    it('Should call #requestUpdate if it exists and input changes', () => {
      dummy.requestUpdate = sinon.spy();
      dummy.input = 'str';

      expect(dummy.requestUpdate).to.have.been.calledOnceWith('input');
    });

    it('Should call #inputChangedCallback if it exists', () => {
      dummy.inputChangedCallback = sinon.spy();
      dummy.input = 'str';

      expect(dummy.inputChangedCallback)
        .to.have.been.calledOnceWith(undefined, 'str');
    });

    it('Should call #dispatchEventAndMethod once, on the next event loop, ' +
      'if input changes once', (done) => {
      dummy.input = 'str';

      setTimeout(() => {
        expect(dummy.dispatchEventAndMethod)
          .to.have.been.calledOnceWith('inputchange', 'str');

        done();
      }, 10);
    });

    it('Should call #dispatchEventAndMethod once, on the next event loop, ' +
      'if input changes many times', (done) => {
      dummy.input = 'str';
      dummy.input = 'dummy';
      dummy.input = 'laser';

      setTimeout(() => {
        expect(dummy.dispatchEventAndMethod)
          .to.have.been.calledOnceWith('inputchange', 'laser');

        done();
      }, 10);
    });

    it('Should call #requestUpdate if it exists and source changes', () => {
      dummy.requestUpdate = sinon.spy();
      dummy.source = 'str';

      expect(dummy.requestUpdate).to.have.been.calledOnceWith('source');
    });

    it('Should call #sourceChangedCallback if it exists', () => {
      dummy.sourceChangedCallback = sinon.spy();
      dummy.source = 'str';

      expect(dummy.sourceChangedCallback)
        .to.have.been.calledOnceWith(undefined, 'str');
    });

    it('Should call #dispatchEventAndMethod once, on the next event loop, ' +
      'if source changes once', (done) => {
      dummy.source = 'str';

      setTimeout(() => {
        expect(dummy.dispatchEventAndMethod)
          .to.have.been.calledOnceWith('sourcechange', 'str');

        done();
      }, 10);
    });

    it('Should call #dispatchEventAndMethod once, on the next event loop, ' +
      'if source changes many times', (done) => {
      dummy.source = 'str';
      dummy.source = 'dummy';
      dummy.source = 'laser';

      setTimeout(() => {
        expect(dummy.dispatchEventAndMethod)
          .to.have.been.calledOnceWith('sourcechange', 'laser');

        done();
      }, 10);
    });

    it('Should call #outputChangedCallback if it exists', () => {
      dummy.outputChangedCallback = sinon.spy();
      dummy.output = 'str';

      expect(dummy.outputChangedCallback)
        .to.have.been.calledOnceWith(undefined, 'str');
    });

    it('Should call #requestUpdate if it exists and output changes', () => {
      dummy.requestUpdate = sinon.spy();
      dummy.output = 'str';

      expect(dummy.requestUpdate).to.have.been.calledOnceWith('output');
    });

    it('Should call #dispatchEventAndMethod once, on the next event loop, ' +
      'if output changes once', (done) => {
      dummy.output = 'str';

      setTimeout(() => {
        expect(dummy.dispatchEventAndMethod)
          .to.have.been.calledOnceWith('outputchange', 'str');

        done();
      }, 10);
    });

    it('Should call #dispatchEventAndMethod once, on the next event loop, ' +
      'if output changes many times', (done) => {
      dummy.output = 'str';
      dummy.output = 'dummy';
      dummy.output = 'laser';

      setTimeout(() => {
        expect(dummy.dispatchEventAndMethod)
          .to.have.been.calledOnceWith('outputchange', 'laser');

        done();
      }, 10);
    });
  });
});
