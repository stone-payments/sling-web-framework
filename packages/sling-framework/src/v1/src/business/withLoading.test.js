import { domHelper } from 'sling-helpers';
import { withLoading } from './withLoading.js';

class Loader extends withLoading() {}
domHelper.registerComponent('with-loading', Loader);

let $dummy;

describe('withLoading', () => {
  beforeEach(() => {
    $dummy = document.createElement('with-loading');
    document.body.appendChild($dummy);
  });

  afterEach(() => {
    document.body.removeChild($dummy);
    $dummy = null;
  });

  describe('.request', () => {
    it('Should handle a single request.', (done) => {
      const singleRequest = Promise.resolve({ level: 42 });

      $dummy
        .request(singleRequest)
        .then((payload) => {
          expect(payload).to.deep.equal({ level: 42 });
          done();
        });
    });

    it('Should handle many requests.', (done) => {
      const manyRequests = [
        Promise.resolve({ level: 42 }),
        Promise.resolve({ ub: 40 }),
      ];

      $dummy
        .request(manyRequests)
        .then((payloads) => {
          expect(payloads).to.deep.equal([{ level: 42 }, { ub: 40 }]);
          done();
        });
    });

    it('Should increment loading while request is not resolved ' +
      'and decrement after success.', (done) => {
      let playPaused;

      const pausedRequest = new Promise((resolve) => {
        playPaused = () => resolve({ level: 42 });
      });

      const waiting = $dummy.request(pausedRequest);
      expect($dummy.loading).to.equal(1);

      waiting
        .then((payload) => {
          expect(payload).to.deep.equal({ level: 42 });
          expect($dummy.loading).to.equal(0);
          done();
        });

      playPaused();
    });

    it('Should increment loading while request is not resolved ' +
      'and decrement after error.', (done) => {
      let playBogus;

      const bogusRequest = new Promise((resolve, reject) => {
        playBogus = () => reject(new Error('error'));
      });

      const waiting = $dummy.request(bogusRequest);
      expect($dummy.loading).to.equal(1);

      waiting
        .catch((err) => {
          expect(err).to.be.an('error');
          expect($dummy.loading).to.equal(0);
          done();
        });

      playBogus();
    });

    it('Should increment and decrement loading with ' +
      'multiple requests.', (done) => {
      let playPaused;
      let playOther;

      const pausedRequest = new Promise((resolve) => {
        playPaused = () => resolve({ level: 42 });
      });

      const otherRequest = new Promise((resolve) => {
        playOther = () => resolve({ ub: 40 });
      });

      const waiting = $dummy.request([
        pausedRequest,
        otherRequest,
      ]);

      expect($dummy.loading).to.equal(2);

      waiting
        .then((payloads) => {
          expect(payloads).to.deep.equal([
            { level: 42 },
            { ub: 40 },
          ]);

          expect($dummy.loading).to.equal(0);
          done();
        });

      playPaused();
      setTimeout(playOther, 50);
    });

    it('Should increment and decrement loading with ' +
      'multiple requests even if one or more fail.', (done) => {
      let playPaused;
      let playOther;
      let playBogus;

      const pausedRequest = new Promise((resolve) => {
        playPaused = () => resolve({ level: 42 });
      });

      const otherRequest = new Promise((resolve) => {
        playOther = () => resolve({ ub: 40 });
      });

      const bogusRequest = new Promise((resolve, reject) => {
        playBogus = () => reject(new Error('error'));
      });

      const waiting = $dummy.request([
        pausedRequest,
        bogusRequest,
        otherRequest,
      ]);

      expect($dummy.loading).to.equal(3);

      waiting
        .catch((err) => {
          expect(err).to.be.an('error');
          expect($dummy.loading).to.equal(0);
          done();
        });

      playOther();
      setTimeout(playBogus, 50);
      setTimeout(playPaused, 100);
    });
  });

  describe('.isLoading', () => {
    it('Should have a correct boolean value for isLoading.', (done) => {
      let playPaused;

      const pausedRequest = new Promise((resolve) => {
        playPaused = () => resolve({ level: 42 });
      });

      const waiting = $dummy.request(pausedRequest);
      expect($dummy.isLoading).to.be.true;

      waiting
        .then(() => {
          expect($dummy.isLoading).to.be.false;
          done();
        });

      playPaused();
    });
  });

  describe('#properties', () => {
    it('Should have a static property called “properties” ' +
      'with a “loading” property.', () => {
      expect($dummy.constructor.properties).to.have.property('loading');
    });
  });
});
