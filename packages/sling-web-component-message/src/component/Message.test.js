import { registerComponent } from 'sling-helpers';
import { Message } from './Message.js';

registerComponent('sling-message', Message);

let $message;

describe('Message', () => {
  beforeEach(() => {
    $message = document.createElement('sling-message');
    document.body.appendChild($message);
  });

  afterEach(() => {
    document.body.removeChild($message);
    $message = undefined;
  });

  it('Should reflect "layout" and "aim" attribute to property ', () => {
    $message.setAttribute('layout', 'outline');
    $message.setAttribute('aim', 'danger');

    expect($message.layout).to.equal('outline');
    expect($message.aim).to.equal('danger');
  });

  it('Should reflect "layout" and "aim" property to attribute ', (done) => {
    $message.layout = 'outline';
    $message.aim = 'sucess';

    setTimeout(() => {
      expect($message.getAttribute('layout')).to.equal('outline');
      expect($message.getAttribute('aim')).to.equal('sucess');
      done();
    });
  });
});
