import sinon from 'sinon';
import { domHelper } from 'sling-helpers';
import { withRequestParams } from './withRequestParams.js';

let $dummy;
let spy;

class ReqParams extends withRequestParams() {
  static get requestParamNames() {
    return [
      'affiliationCodes',
      'crossBalance',
      'finalDate',
      'page',
      'startDate',
    ];
  }

  onRequestParamChanged(allParams, changedParams) {
    spy(allParams, changedParams);
    return this;
  }
}

domHelper.registerComponent('with-req-params', ReqParams);

describe('withRequestParams', () => {
  beforeEach(() => {
    spy = sinon.spy();
    $dummy = document.createElement('with-req-params');
    document.body.appendChild($dummy);
  });

  afterEach(() => {
    document.body.removeChild($dummy);
    $dummy = null;
    spy = null;
  });

  it('Should reflect attribute to property as string.', () => {
    $dummy.setAttribute('page', 8);
    expect($dummy.page).to.equal('8');
  });

  it('Should reflect property to attribute as string.', () => {
    $dummy.page = 8;
    expect($dummy.getAttribute('page')).to.equal('8');
  });

  it('Should remove attribute when property is null or undefined.', () => {
    $dummy.page = 8;
    expect($dummy.hasAttribute('page')).to.be.true;

    $dummy.page = null;
    expect($dummy.hasAttribute('page')).to.be.false;

    $dummy.page = 8;
    expect($dummy.hasAttribute('page')).to.be.true;

    $dummy.page = undefined;
    expect($dummy.hasAttribute('page')).to.be.false;
  });

  it('Should convert boolean properties to string attributes.', () => {
    $dummy.crossbalance = false;
    expect($dummy.getAttribute('crossbalance')).to.equal('false');

    $dummy.crossbalance = true;
    expect($dummy.getAttribute('crossbalance')).to.equal('true');
  });

  it('Should not break when requestParamNames is undefined.', () => {
    class NoReqParams extends withRequestParams() {}
    domHelper.registerComponent('no-req-params', NoReqParams);

    document.body.removeChild($dummy);
    $dummy = document.createElement('no-req-params');
    document.body.appendChild($dummy);

    expect($dummy.constructor.requestParamNames).to.eql([]);
  });

  it('Should call inherited attributeChangedCallback.', () => {
    class Parent extends HTMLElement {
      attributeChangedCallback() {
        spy(this);
      }
    }

    class ReqKeepAttrChanged extends withRequestParams(Parent) {
      static get observedAttributes() {
        return ['observed'];
      }
    }

    domHelper.registerComponent('req-keep-attr-changed', ReqKeepAttrChanged);

    document.body.removeChild($dummy);
    $dummy = document.createElement('req-keep-attr-changed');
    document.body.appendChild($dummy);

    $dummy.setAttribute('observed', 'changed');
    expect(spy).to.have.been.calledOnce;
  });

  describe('#observedAttributes', () => {
    it('Should include requestParamNames converted to lowercase.', () => {
      expect($dummy.constructor.observedAttributes.sort())
        .to.eql([
          'affiliationcodes',
          'crossbalance',
          'finaldate',
          'page',
          'startdate',
        ]);
    });

    it('Should not override inherited observedAttributes.', () => {
      class Parent extends HTMLElement {
        static get observedAttributes() {
          return ['inherited'];
        }
      }

      class ReqKeepObserved extends withRequestParams(Parent) {
        static get requestParamNames() {
          return ['page'];
        }
      }

      domHelper.registerComponent('req-keep-observed', ReqKeepObserved);

      document.body.removeChild($dummy);
      $dummy = document.createElement('req-keep-observed');
      document.body.appendChild($dummy);

      expect($dummy.constructor.observedAttributes).to.include('inherited');
      expect($dummy.constructor.observedAttributes).to.include('page');
    });
  });

  describe('.onRequestParamChanged', () => {
    it('Should call onRequestParamChanged if a request param changes.', () => {
      expect(spy).not.to.have.been.called;
      $dummy.setAttribute('page', '3');
      expect(spy).to.have.been.called;
    });

    it('Should not break if onRequestParamChanged is not a function.', () => {
      $dummy.onRequestParamChanged = null;
      $dummy.setAttribute('page', '3');
      expect(spy).not.to.have.been.called;
    });

    it('Should not call onRequestParamChanged if a request param ' +
      'changes to the previous value.', () => {
      $dummy.setAttribute('crossbalance', 'true');
      $dummy.setAttribute('crossbalance', 'true');
      $dummy.setAttribute('crossbalance', 'true');
      expect(spy).to.have.been.calledOnce;
    });

    it('Should not call onRequestParamChanged if a changed attribute ' +
      'is not a request param.', () => {
      $dummy.setAttribute('nothing', 'not a request param');
      expect(spy).not.to.have.been.called;
    });

    it('Should receive an object containing all the request parameters ' +
      'as the first argument.', () => {
      $dummy.setAttribute('affiliationcodes', '123456789');

      expect(spy.args[0][0]).to.eql({
        affiliationCodes: '123456789',
      });

      $dummy.setAttribute('startdate', '2018-06-01');

      expect(spy.args[1][0]).to.eql({
        affiliationCodes: '123456789',
        startDate: '2018-06-01',
      });

      $dummy.removeAttribute('affiliationcodes');

      expect(spy.args[2][0]).to.eql({
        startDate: '2018-06-01',
      });

      expect(spy).to.have.been.calledThrice;
    });

    it('Should exclude parameters with empty values ' +
      'at the first argument.', () => {
      $dummy.setAttribute('affiliationcodes', '123456789');

      expect(spy.args[0][0]).to.eql({
        affiliationCodes: '123456789',
      });

      $dummy.setAttribute('startdate', '');

      expect(spy.args[1][0]).to.eql({
        affiliationCodes: '123456789',
      });

      expect(spy).to.have.been.calledTwice;
    });

    it('Should receive an object containing only the changed parameters ' +
      'as the second argument.', () => {
      $dummy.setAttribute('affiliationcodes', '123456789');

      expect(spy.args[0][1]).to.eql({
        affiliationCodes: '123456789',
      });

      $dummy.setAttribute('startdate', '2018-06-01');

      expect(spy.args[1][1]).to.eql({
        startDate: '2018-06-01',
      });

      $dummy.removeAttribute('affiliationcodes');

      expect(spy.args[2][1]).to.eql({
        affiliationCodes: null,
      });

      expect(spy).to.have.been.calledThrice;
    });

    it('Should not exclude parameters with empty or undefined values ' +
      'at the second argument.', () => {
      $dummy.setAttribute('affiliationcodes', '123456789');

      expect(spy.args[0][1]).to.eql({
        affiliationCodes: '123456789',
      });

      $dummy.setAttribute('startdate', '');

      expect(spy.args[1][1]).to.eql({
        startDate: null,
      });

      expect(spy).to.have.been.calledTwice;
    });
  });
});
