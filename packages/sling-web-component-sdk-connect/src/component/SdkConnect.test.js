import { registerComponent } from 'sling-helpers';
import { SdkConnect } from './SdkConnect.js';

registerComponent('sling-web-sdk', SdkConnect);

const validStore = {
  getState() { return { a: 1 }; },
  dispatch() { return { a: 2 }; },
  subscribe() {},
  replaceReducer() {},
};

const invalidStore = { bogus: true };

let $sdkConnect;

describe('SdkConnect', () => {
  beforeEach(() => {
    $sdkConnect = document.createElement('sling-web-sdk');
    document.body.appendChild($sdkConnect);
  });

  afterEach(() => {
    document.body.removeChild($sdkConnect);
    $sdkConnect = undefined;
  });

  it('Should set a valid store as a property.', () => {
    $sdkConnect.store = validStore;
    expect($sdkConnect.store).to.equal(validStore);
  });

  it('Should not set an invalid store as a property.', () => {
    $sdkConnect.store = invalidStore;
    expect($sdkConnect.store).to.equal(undefined);
  });

  it('Should dispatch an event when a valid store is set.', (done) => {
    const handleStoreCreated = () => {
      document.removeEventListener('storecreated', handleStoreCreated);
      done();
    };

    document.addEventListener('storecreated', handleStoreCreated);
    $sdkConnect.store = validStore;
  });

  it('Should access store state as a property.', () => {
    $sdkConnect.store = validStore;
    expect($sdkConnect.state).to.eql(validStore.getState());
  });

  it('Should access store dispatch method as a property.', () => {
    $sdkConnect.store = validStore;
    expect($sdkConnect.dispatch).to.eql(validStore.dispatch);
  });

  it('Should access store subscribe method as a property.', () => {
    $sdkConnect.store = validStore;
    expect($sdkConnect.subscribe).to.eql(validStore.subscribe);
  });
});
